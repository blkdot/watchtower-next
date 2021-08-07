import React,{useState,useEffect} from "react";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";
import { format, parseISO, subDays } from "date-fns";
import styles from './style.module.scss'

function makeQuery(network,token,startDate,interval,limit) {
  let quote
  if(network=='bsc') {
    quote="0xe9e7cea3dedca5984780bafc599bd69add087d56" // busd
  } else {
    quote="0xdac17f958d2ee523a2206206994597c13d831ec7" // usdt
  }

  return(`
  {
    ethereum(network: ${network}) {
      dexTrades(
        options: {limit: ${limit},asc: "timeInterval.minute"}
        date: {since: "${startDate}"}
        baseCurrency: {is: "${token}"}
        quoteCurrency: {is: "${quote}"}
      ) {
        timeInterval {
          minute(count: ${interval})
        }
        baseCurrency {
          symbol
          address
        }
        baseAmount
        quoteCurrency {
          symbol
          address
        }
        volume: quoteAmount
        trades: count
        current: quotePrice
        open: minimum(of: block, get: quote_price)
        high: quotePrice(calculate: maximum)
        low: quotePrice(calculate: minimum)
        close: maximum(of: block, get: quote_price)
      }
    }
  }
  `)
}

function getHistoryData(query) {
  return new Promise((resolve, reject) => {
    fetch("https://graphql.bitquery.io/", {
      method: "POST",
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({
          query: query,
          variables: "{}"
      }),
    })
    .then(response => response.json())
    .then(json => {
      resolve(json.data)
    })
    .catch(() => {
      reject()
    })
  })
}

function parseResultDataByHour(data) {
  return data.ethereum.dexTrades.map(trade => (
    {
      date: new Date(trade.timeInterval.minute + " GMT").toString().substring(16,25),
      value: parseFloat(trade.close)
    }
  ))
}

function parseResultDataByDate(data) {
  return data.ethereum.dexTrades.map(trade => (
    {
      date: format(new Date(trade.timeInterval.minute + " GMT"), "MM/dd/yy"),
      value: parseFloat(trade.close)
    }
  ))
}

export default function Graph(Props) {
  const [data1H,setData1H] = useState([]);
  const [data1D,setData1D] = useState([]);
  const [data1W,setData1W] = useState([]);
  const [data1M,setData1M] = useState([]);
  const [data1Y,setData1Y] = useState([]);

  const [active, setActive] = useState('H')
  const [graphData, setGraphData] = useState(null);
  const [percent, setPercent]=useState(Props.Props.percent1h) 

  useEffect(() => 
    {
      let queryH, queryD, queryW, queryM, queryY
      if(Props.Props.Bsc) {
        queryH = makeQuery('bsc',Props.Props.Bsc,(new Date().getFullYear()+(new Date().getMonth()<9?'-0':'-')+(new Date().getMonth()+1)+(new Date().getDate()<10?'-0':'-')+new Date().getDate()).toString(),1,60);
        queryD = makeQuery('bsc',Props.Props.Bsc,(new Date().getFullYear()+(new Date().getMonth()<9?'-0':'-')+(new Date().getMonth()+1)+(new Date().getDate()<10?'-0':'-')+(new Date().getDate()-1)).toString(),30,48);
        queryW = makeQuery('bsc',Props.Props.Bsc,(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getFullYear()+(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getMonth()<9?'-0':'-')+(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getMonth()+1)+(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getDate()<10?'-0':'-')+new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getDate()).toString(),4*60,60);
        queryM = makeQuery('bsc',Props.Props.Bsc,(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getFullYear()+(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getMonth()<9?'-0':'-')+(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getMonth()+1)+(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getDate()<10?'-0':'-')+new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getDate()).toString(),24*60,60);
        queryY = makeQuery('bsc',Props.Props.Bsc,((new Date().getFullYear()-1)+(new Date().getMonth()<9?'-0':'-')+(new Date().getMonth()+1)+(new Date().getDate()<10?'-0':'-')+new Date().getDate()).toString(),24*60,60);
      } else if(Props.Props.Eth) {
        queryH = makeQuery('ethereum',Props.Props.Eth,(new Date().getFullYear()+(new Date().getMonth()<9?'-0':'-')+(new Date().getMonth()+1)+(new Date().getDate()<10?'-0':'-')+new Date().getDate()).toString(),1,60);
        queryD = makeQuery('ethereum',Props.Props.Eth,(new Date().getFullYear()+(new Date().getMonth()<9?'-0':'-')+(new Date().getMonth()+1)+(new Date().getDate()<10?'-0':'-')+(new Date().getDate()-1)).toString(),30,48);
        queryW = makeQuery('ethereum',Props.Props.Eth,(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getFullYear()+(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getMonth()<9?'-0':'-')+(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getMonth()+1)+(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getDate()<10?'-0':'-')+new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getDate()).toString(),4*60,60);
        queryM = makeQuery('ethereum',Props.Props.Eth,(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getFullYear()+(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getMonth()<9?'-0':'-')+(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getMonth()+1)+(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getDate()<10?'-0':'-')+new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getDate()).toString(),24*60,60);
        queryY = makeQuery('ethereum',Props.Props.Eth,((new Date().getFullYear()-1)+(new Date().getMonth()<9?'-0':'-')+(new Date().getMonth()+1)+(new Date().getDate()<10?'-0':'-')+new Date().getDate()).toString(),24*60,60);
      }

      getHistoryData(queryH)
        .then(res => {
          if(res && res.ethereum){
            let data = parseResultDataByHour(res)
            setData1H(data);

            if (active === 'H') {
              setGraphData(data)
            }
          }
        })
      
      getHistoryData(queryD)
        .then(res => {
          if(res && res.ethereum){
            let data = parseResultDataByHour(res)
            setData1D(data);
            if (active === 'D') {
              setGraphData(data)
            }
          }
        })

      getHistoryData(queryW)
        .then(res => {
          if(res && res.ethereum){
            let data = parseResultDataByDate(res)
            setData1W(data);
  
            if (active === 'W') {
              setGraphData(data)
            }
          }
        })
    
    getHistoryData(queryM)
      .then(res => {
        if(res && res.ethereum){
          let data = parseResultDataByDate(res)
          setData1M(data);

          if (active === 'M') {
            setGraphData(data)
          }
        }
      })

    getHistoryData(queryY)
      .then(res => {
        if(res && res.ethereum){
          let data = parseResultDataByDate(res)
          setData1Y(data);

          if (active === 'Y') {
            setGraphData(data)
          }
        }
      })
    },
    [Props])

  const setPerHour = () => {
    setActive('H');
    setGraphData(data1H);
    setPercent(Props.Props.percent1h)
  }
  const setPerDay = () => {
    setActive('D');
    setGraphData(data1D);
    setPercent(Props.Props.percent1d)
  }
  const setPerWeek = () => {
    setActive('W');
    setGraphData(data1W);
    setPercent(Props.Props.percent1w)
  }
  const setPerMonth = () => {
    setActive('M');
    setGraphData(data1M);
    setPercent(Props.Props.percent1m)
  }
  const setPerYear = () => {
    setActive('Y');
    setGraphData(data1Y);
    setPercent(Props.Props.percent1y)
  }

  return (
  <>
    {<div className={styles.graph} id='graph'>
      <div className={styles.flexContent}>
        <div className={styles.tokenData}>
          <div className={styles.name}>{Props.Props.name+" Price"}</div>
          <div className={styles.priceBar}>
            <span className={styles.price}>{"$"+(((Props.Props.price+"").includes('e'))?Props.Props.price.toFixed(13):Props.Props.price)}</span>
            <span className={styles.percent}>{percent+"%"}</span>
          </div>
        </div>
        <div className={styles.buttonBar}>
          <span className={(active=='H')?styles.active:styles.button} onClick={setPerHour}>1H</span>
          <span className={(active=='D')?styles.active:styles.button} onClick={setPerDay}>1D</span>
          <span className={(active=='W')?styles.active:styles.button} onClick={setPerWeek}>1W</span>
          <span className={(active=='M')?styles.active:styles.button} onClick={setPerMonth}>1M</span>
          <span className={(active=='Y')?styles.active:styles.button} onClick={setPerYear}>1Y</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={graphData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.5} />
            </linearGradient>
          </defs>
  
          <Area type='curve' dataKey="value" stroke="#2451B7" fill="rgba(36, 81, 183, 0.3)" />
          
          <XAxis
            dataKey="date"
            axisLine={true}
            tickLine={false}
          />
  
          <YAxis
            datakey="value"
            axisLine={true}
            tickLine={false}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
  
          <Tooltip strokeDashArray="5 5" content={<CustomTooltip/>} position="top" cursor={{ stroke: '#ff0000', strokeWidth: 2,strokeDasharray:"5 5", width:"50px"}} />
  
          <CartesianGrid strokeDasharray="5 5" opacity={0.03} />
        </AreaChart>
      </ResponsiveContainer>
      </div>}
    </>
  )
}
  
function CustomTooltip({ active, payload, label }) {
  if (active) {
    return payload && (
      <div className="tooltip">
        <p style={{fontFamily:'Montessart',fontWeight:'500',fontSize: '20px',textAlign:'center',margin:'0',padding:'0'}}>
          ${payload[0].value.toFixed(2)} USD
        </p>
        <p style={{fontFamily:'Montessart',fontWeight:'400',fontSize: '12px',textAlign:'center',margin:'0',padding:'0',color:'#ADADAD'}}>
          {label}
        </p>
      </div>
    );
  }
  return null;
}