import Head from 'next/head'
import React, {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import cache from "memory-cache";
import { format, parseISO, subDays } from "date-fns"

import Bitquery from '../../../api/bitquery'

import Navbar from '../../../components/common/NavBar/Navbar'
import Header from '../../../components/page4/Header4/Header'
import Footer from '../../../components/common/Footer/Footer'
import Contact from '../../../components/page4/Contact/Contact'
import Description from '../../../components/page4/Description/Description'
import Holders from '../../../components/page4/Holders/Holders'
import PoolInfo from '../../../components/page4/PoolInfo/PoolInfo'
import Transactions from '../../../components/page4/Transactions/Transactions'
import Search from '../../../components/page4/Search/Search'

import CircularProgress from '@material-ui/core/CircularProgress'

import style from '../../../styles/Home.module.css'

const TradingView = dynamic(() => import("../../../components/page4/TradingView/TradingView"), {
  ssr: false
});

const COINS_DATA_EXPIRY_TIME = 6 * 60 * 60 * 1000;
const BSC_DEX = 'Pancake v2'
const ETH_DEX = 'Uniswap'
const FEED_TRANSACTIONS_INTERVAL = 8000

export default function Token(props) {
  const router = useRouter();
  const { Token } = router.query;

  const [loading, setLoading] = useState(false)
  const [tokenList, setTokenList] = useState([])
  const [tokenData, setTokenData] = useState()

  const [tokenID, setTokenID] = useState(null)
  const [tokenCode, setTokenCode] = useState(null)
  const [tokenName, setTokenName] = useState(null)
  const [tokenAddress, setTokenAddress] = useState(null)

  const [totalSupply, setTotalSupply] = useState(null)
  const [burnedAmount, setBurnedAmount] = useState(null)

  const [liquidityPairs, setLiquidityPairs] = useState([])
  const [liquidityPools, setLiquidityPools] = useState([])
  
  const [mainNetwork, setMainNetwork] = useState('bsc')
  const [dexTitle, setDexTitle] = useState(BSC_DEX)
  const [pricesList, setPricesList] = useState({})
  
  const [holdersData, setHoldersData] = useState([])
  const [top5Holders, setTop5Holders] = useState([])
  const [top5HoldersPercentage, setTop5HoldersPercentage] = useState(-1)

  const [transactions, setTransactions] = useState([])
  const [pricesHistory, setPricesHistory] = useState([])

  const wrappedEth = () => mainNetwork === 'bsc' ? 'WBNB' : 'WETH'

  const fetchAllCoinsInfo = async () => {
    setLoading(false)

    const url = "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
    const cachedResponse = cache.get(url);
    if (cachedResponse) {
       setTokenList(cachedResponse);
    } else {
      const response = await fetch(url);
      const data = await response.json();
      cache.put(url, data, COINS_DATA_EXPIRY_TIME);

      setTokenList(data);
    }

    setLoading(true);
    console.log('fetchAllCoinsInfo()')
  }

  const searchTokenFromList = (toSearch) => {
    for(let i=0; i < tokenList.length; i++) {
      if(
        tokenList[i].symbol.toUpperCase() == toSearch.toUpperCase() ||
        tokenList[i].name.toUpperCase() == toSearch.toUpperCase() ||
        (tokenList[i].platforms.ethereum && (tokenList[i].platforms.ethereum == toSearch)) ||
        (tokenList[i].platforms['binance-smart-chain'] && (tokenList[i].platforms['binance-smart-chain'] == toSearch))
      ) {
        setTokenID(tokenList[i].id)
        setTokenName(tokenList[i].name)
        setTokenCode(tokenList[i].symbol)

        if (tokenList[i].platforms['binance-smart-chain']) {
          setMainNetwork('bsc')
          setDexTitle(BSC_DEX)
          setTokenAddress(tokenList[i].platforms['binance-smart-chain'])
          console.log('BSC Token Address: ', tokenList[i].platforms['binance-smart-chain'])
        } else if (tokenList[i].platforms.ethereum) {
          setMainNetwork('ethereum')
          setDexTitle(ETH_DEX)
          setTokenAddress(tokenList[i].platforms.ethereum)
          console.log('ETH Token Address: ', tokenList[i].platforms.ethereum)
        }

        console.log('searchTokenFromList() ', i, tokenList[i].id)
        return
      }
    }
  }

  /**
   * getTokenDetail()
   * 
   * @returns 
   */
  const getTokenDetail= async () => {
    let cachedResponse, result
    if (!tokenID) return

    console.log('Loading token detail:', tokenID)
    cachedResponse = cache.get("https://api.coingecko.com/api/v3/coins/"+tokenID+"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
    if (cachedResponse) {
      setTokenData(cachedResponse)
      console.log('Cached token data: ', cachedResponse)
    } else {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/"+tokenID+"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
      const data = await response.json();
      cache.put(
        "https://api.coingecko.com/api/v3/coins/"+tokenID+"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false",
        data,
        COINS_DATA_EXPIRY_TIME
      )
      setTokenData(data)
      console.log('Received token data: ', data)
    }

    // Total supply
    try {
      result = await Bitquery.sendRequest(Bitquery.makeQueryTotalSupplies(mainNetwork, tokenAddress))
      if (result.ethereum.transfers) {
          setTotalSupply(result.ethereum.transfers[0].amount)
      }
    } catch(e) {
      console.log('Error while fetching total supply')
    }

    // Burned amount
    try {
      result = await Bitquery.sendRequest(Bitquery.makeQueryBurnedTokens(mainNetwork, tokenAddress))
      if (result.ethereum.transfers) {
          setBurnedAmount(result.ethereum.transfers[0].amount)
      }
    } catch(e) {
      console.log('Error while fetching burned amount')
    }
  }

  /**
   * getLiquidityPoolsInfo()
   * 
   */
  const getLiquidityPoolsInfo = async () => {
    let result, pairsList, priceList = {BUSD: 1, USDC: 1, USDT: 1}, poolsInfo = []
    /**
     * get all pairs list
     */
    try {
      result = await Bitquery.sendRequest(Bitquery.makeQueryTokenPairs(mainNetwork, tokenAddress))
      pairsList = result.ethereum.dexTrades
        .filter(dexTrade => dexTrade.exchange.fullName === dexTitle)
        .map(dexTrade => ({
            symbol: dexTrade.pair.symbol, /* pair symbol */
            token: dexTrade.pair.address, /* pair token */
            address: dexTrade.poolToken.address.address, /* liquidity pair address */
        }))
      setLiquidityPairs(pairsList)
      console.log('Pairs list: ', pairsList)
    } catch(e) {
      console.log('Error while fetching token\'s pair.')
    }

    /**
     * get major Liquidity Pools info
     */
    for (let pair of pairsList.slice(0, 2)) {
      try {
        // get LP's balances
        let balances = await Bitquery.sendRequest(Bitquery.makeQueryBalances(mainNetwork, pair.address))
        balances = balances.ethereum.address[0].balances
            .filter(item => item.currency.symbol === pair.symbol)
            .map(item => ({symbol: item.currency.symbol, value: item.value}))

        poolsInfo.push({...pair, locked: balances})
      } catch(e) {
        console.log('Error while fetching pool of ', pair.symbol)
      }
    }
    setLiquidityPools(poolsInfo)
    console.log('Liquidity pools: ', poolsInfo)

    /**
     * get token price
     */
    // get WBNB or WETH price in USD
    try {
      if (mainNetwork === 'bsc') {
        result = await Bitquery.sendRequest(Bitquery.makeQueryLatestPrice('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', mainNetwork))
        if (result.ethereum.dexTrades && result.ethereum.dexTrades.length) {
          priceList['WBNB'] = result.ethereum.dexTrades[0]["quotePrice"]
          console.log('WBNB Price: $', priceList['WBNB'])
        }
      } else {
        result = await Bitquery.sendRequest(Bitquery.makeQueryLatestPrice('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', mainNetwork))
        if (result.ethereum.dexTrades && result.ethereum.dexTrades.length) {
          priceList['WETH'] = result.ethereum.dexTrades[0]["quotePrice"]
          console.log('WETH Price: $', priceList['WETH'])
        }
      }
    } catch(e) {
      console.log('Error while fetching WBNB price.')
    }

    // get current token's price
    try {
      result = await Bitquery.sendRequest(Bitquery.makeQueryLatestPriceByETH(tokenAddress, mainNetwork))
      if (result.ethereum.dexTrades && result.ethereum.dexTrades.length) {
        priceList[tokenID] = result.ethereum.dexTrades[0]["quotePrice"] * priceList[wrappedEth()]
      }
    } catch(e) {
      console.log('Error while fetching token price by ETH.')
    }
    if (!priceList[tokenID]) {
      try {
        result = await Bitquery.sendRequest(Bitquery.makeQueryLatestPrice(tokenAddress, mainNetwork))
        if (result.ethereum.dexTrades && result.ethereum.dexTrades.length) {
          priceList[tokenID] = result.ethereum.dexTrades[0]["quotePrice"]
        }
      } catch(e) {
        console.log('Error while fetching token price by USD.')
      }
    }
    console.log(tokenID, 'Price: $', priceList[tokenID])

    // get pair tokens price
    for (let pair of pairsList.slice(0, 2)) {
      if (pair.symbol === 'BUSD' || pair.symbol === 'USDC' || priceList[pair.symbol]) {
          continue;
      }
      try {
        result = await Bitquery.sendRequest(Bitquery.makeQueryLatestPriceByETH(pair.token, mainNetwork))
        if (result.ethereum.dexTrades && result.ethereum.dexTrades.length) {
          priceList[pair.symbol] = result.ethereum.dexTrades[0]["quotePrice"] * priceList[wrappedEth()]
        }
      } catch(e) {
        console.log('Error while fetching token ', pair.symbol , ' price by ETH')
      }

      if (!priceList[pair.symbol]) {
        try {
          result = await Bitquery.sendRequest(Bitquery.makeQueryLatestPrice(pair.token, mainNetwork))
          if (result.ethereum.dexTrades && result.ethereum.dexTrades.length) {
            priceList[pair.symbol] = result.ethereum.dexTrades[0]["quotePrice"]
          } else {
            priceList[pair.symbol] = 0
          }
        } catch(e) {
          console.log('Error while fetching token ', pair.symbol , ' price by USD')
        }
      }
      console.log(pair.symbol, 'Price: $', priceList[pair.symbol])
    }
    setPricesList(priceList)
    console.log('Prices: ', priceList)
  }

  /**
   * generateTop5()
   * 
   * @param {*} dataList 
   * @returns 
   */
   const generateTop5 = (dataList) => {
    if(!dataList.length) return

    let sortedHolderData = dataList.sort((a, b) => (Number(a.TokenHolderQuantity)) < (Number(b.TokenHolderQuantity)) ? 1 : -1)      
    let listHolder=[]

    for(let i=0; (i<sortedHolderData.length) && (listHolder.length<5); i++) {
      let tokenHolderAddress = sortedHolderData[i].TokenHolderAddress.toLowerCase()
      if((tokenHolderAddress != "0x0000000000000000000000000000000000000000") &&
        (tokenHolderAddress != "0x0000000000000000000000000000000000000001") &&
        (tokenHolderAddress != "0x000000000000000000000000000000000000dead") &&
        (tokenHolderAddress !="0x0000000000000000000000000000000000001004") &&
        (tokenHolderAddress !="0x0000000000000000000000000000000000000002")
      ) {
        listHolder.push(sortedHolderData[i])
      }
    }
    return listHolder
  }

  /**
   * fetchHolderData()
   * 
   * @param {*} token 
   * @param {*} network 
   * @returns 
   */
  const fetchHolderData = async (token, network='bsc') => {
    let url = '', percentage = 0
    if(network === 'bsc') {
      url = `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${token}&apikey=4ZPVUA6II5UV8GCS7YFPAZIH7NHV2HH1FU`
    } else {
      url = `https://api.etherscan.io/api?module=token&action=tokenholderlist&contractaddress=${token}&apikey=4ZPVUA6II5UV8GCS7YFPAZIH7NHV2HH1FU`
    }

    const response = await fetch(url);
    const data = await response.json();
    setHoldersData(data.result)
    console.log('All Holders: ', data.result)

    const top5Results = generateTop5(data.result)
    setTop5Holders(top5Results)

    for(let i; i<top5Results.length; i++){
      percentage += Number(top5Results[i].TokenHolderQuantity)/1000000000000000000/totalSupply
    }
    setTop5HoldersPercentage(percentage)
    console.log('Top 5 Holders:', top5Results)
  }

  /**
   *  fetchTransactions()
   * 
   */
  const fetchTransactions = async () => {
    try {
      let result = await Bitquery.sendRequest(
        Bitquery.makeTransactionsQuery(tokenAddress, mainNetwork)
      )
      if (result) {
        setTransactions(result.ethereum.dexTrades)
      }
    } catch(e) {
      console.log('Error while fetching transactions ...')
    }
  }

  const fetchPricesHistory = async () => {
    const from = new Date()
    from.setFullYear(from.getFullYear() - 1)
    const fromString = format(from, 'yyyy-MM-dd')

    try {
      let result = await Bitquery.sendRequest(
        Bitquery.makePriceHistoryQuery(tokenAddress, mainNetwork, fromString, 24*60)
      )
      if (result && result.ethereum) {
        setPricesHistory(result.ethereum.dexTrades)
      }
    } catch(e) {
      console.log('Error while fetching price history ...')
    }
  }

  useEffect(() => {
    fetchAllCoinsInfo()
  }, [])

  useEffect(() => {
    setTokenID()
    setTokenAddress()
    setTokenName()
    setTokenCode()

    setTotalSupply()
    setBurnedAmount()
    setHoldersData([])
    setTop5Holders([])

    setTransactions([])
    setPricesHistory([])
    
    if (! Token) return

    console.log('Loading token data ...', Token)
    searchTokenFromList(Token)
  }, [Token, tokenList]);


  useEffect(() => {
    if (!tokenID) return

    setLoading(false)
    getTokenDetail()
    getLiquidityPoolsInfo()

    fetchHolderData(tokenAddress, mainNetwork)

    fetchTransactions()
    fetchPricesHistory()
    setLoading(true)
  }, [tokenID, tokenAddress])

  return (
      <>
      <Head>
        <meta charSet="utf-8"/>
        <title>WatchTower</title>
        <meta property="og:title" content="My page title" key="title" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/assets/logo.png" type="image/gif" sizes="16x16"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin ></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>            
      </Head>
      {
        (loading && tokenID && tokenData) ? 
        (<div className={style.container}>
          <Navbar active='more'/> 
          <Search />
          <Header
            tokenCode={tokenCode}
            name={tokenName}
            description={tokenData.description.en}
            imageUrl={tokenData.image.large}
            tokenSite={tokenData.links.homepage.filter(item => item.length > 0)[0]}
          />
          <Description 
            totalSupply={totalSupply}
            burnedAmount={burnedAmount}
            top5HoldersPercentage={top5HoldersPercentage}
            riskRating={2.5}
            imageUrl={tokenData.image.large}
          />
          <TradingView
            network={mainNetwork}
            tokenAddress={tokenAddress}
            pricesHistory={pricesHistory}
          />
          <Transactions
            network={mainNetwork}
            tokenAddress={tokenAddress}
            transactions={transactions}
          />
          <Holders 
            network={mainNetwork}
            tokenAddress={tokenAddress}
            totalSupply={totalSupply}
            burnedAmount={burnedAmount}
            top5Holders={top5Holders}
            price={pricesList[tokenID]}
          />
          <PoolInfo
            network={mainNetwork}
            tokenID={tokenID}
            tokenAddress={tokenAddress}
            totalSupply={totalSupply}
            burnedAmount={burnedAmount}
            liquidityPairs={liquidityPairs}
            liquidityPools={liquidityPools}
            pricesList={pricesList}
          />
          <Contact/>
          <Footer/>
        </div>) :
      (<div className={style.loading}>
          <p>Loading...</p>
          <CircularProgress /> 
        </div>)
      }
    </>)
}
