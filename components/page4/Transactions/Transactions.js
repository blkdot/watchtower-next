import React from 'react'
import styles from './style.module.scss'

export default function Transactions({network, tokenAddress, transactions}) {
  return (
    <div className={styles.transactions}>
      <p className={styles.heading}>Transactions</p>
      <div className={styles.transactionsTable}>
      { transactions?
        (
          <table>
            <thead>
              <tr className={styles.headingRow}>
                <th className={styles.rowHeader}></th>
                <th className={styles.rowHeader}>Tokens</th>
                <th className={styles.rowHeader}>VALUE (USD/BNB)</th>
                {/* <td className={styles.rowHeader}>Price/Token</td> */}
                <th className={styles.rowHeader}>PRICE(TOKEN)</th>
                <th className={styles.rowHeader}>Time</th>
                <th className={styles.rowHeader} width="30%" style={{paddingRight:'1.5rem'}}>Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
            {
              transactions.map((transaction,index)=>{
                return (
                  <tr className={styles.dataRow} key={index}>
                    <td className={(transaction.side=='BUY')?styles.green:styles.red}>
                      {transaction.side}
                    </td>
                    <td className={(transaction.side=='BUY')?styles.green:styles.red}>
                      <p>{(transaction.side=='BUY')?(transaction.buyAmount+"").substring(0,10):(transaction.sellAmount+"").substring(0,10)}</p>
                      <p className={styles.second}>{transaction.baseCurrency.symbol}</p>
                    </td> 
                    {/* <td className={(transaction.side=='BUY')?styles.green:styles.red}>
                        <p>{"$"+(transaction.tradeAmount+"").substring(0,8)}</p>
                        <p className={styles.second}>{((transaction.side=='BUY')?(transaction.sellAmount+"").substring(0,7):(transaction.buyAmount+"").substring(0,7))+" "+((transaction.side=='BUY')?transaction.sellCurrency.symbol:transaction.buyCurrency.symbol)}</p>
                    </td> */}
                    <td className={(transaction.side=='BUY')?styles.green:styles.red}>
                      <p>{"$"+(transaction.tradeAmount+"").substring(0,8)}</p>
                      <p className={styles.second}>
                        {transaction.quoteAmount.toFixed(7)+" "+transaction.quoteCurrency.symbol}
                      </p>
                    </td>

                    <td className={(transaction.side=='BUY')?styles.green:styles.red}>
                      <p>{"$"+(transaction.transaction.gasValue).toFixed(7)}</p>
                      <p className={styles.second}>{transaction.exchange.name}</p>
                    </td>
                    <td className={(transaction.side=='BUY')?styles.green:styles.red}>
                    {
                      (new Date(transaction.block.timestamp.time)).toString().substring(16,25)
                    }
                    </td>
                    <td className={styles.track} style={{paddingRight:'1.5rem'}}>
                      <a href={"https://bscscan.com/tx/"+transaction.transaction.hash} target="_blank" rel="noreferrer">
                        <p>{transaction.transaction.hash.substring(0,25)+"....."}</p>
                        <p className={styles.second}>Track</p>
                      </a>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
        </table>)
            :
            (<h4>Not Fetched Yet</h4>)
        }
        </div>
        <div className={styles.more}>
          <a href={network==='bsc' ? "https://bscscan.com/token/" + tokenAddress : "https://etherscan.com/token/" + tokenAddress} target="_blank" rel="noreferrer">
            See All Transactions
          </a>
        </div>
    </div>
  )
}
