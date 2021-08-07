import React,{useEffect,useState} from 'react'
import styles from './style.module.scss'

export default function Holders({
  network,
  tokenAddress,
  totalSupply,
  burnedAmount,
  top5Holders,
  price,
}) {   
    return (
      <>
        <div className={styles.holders}>
            <p className={styles.heading}>Contract Address (TOP 5 holders)</p>
            {
              (totalSupply && burnedAmount) ?
              (<div className={styles.tableContainer}>
                <table width="100%" height="auto">
                    <thead>
                    <tr className={styles.headingRow}>
                        <td className={styles.rowHeading}>Wallet_Address</td>
                        <td className={styles.rowHeading}>Tokens</td>
                        <td className={styles.rowHeading}>Value($)</td>
                        <td className={styles.rowHeading}>Value(%)</td>
                        {/* <td className={styles.rowHeading}>Last Activity</td> */}
                    </tr>
                    </thead>
                    <tbody>
                      {
                        (top5Holders && top5Holders.length > 0) ? 
                        (top5Holders.map((row,index) => {
                          return(
                            <tr className={styles.dataRow} key={index}>
                              <td className={styles.rowdata}>
                                {row.TokenHolderAddress}
                              </td>
                              <td className={styles.rowdata}>
                                {row.TokenHolderQuantity/1000000000}
                              </td>
                              <td className={styles.rowdata}>
                                {"$"+((row.TokenHolderQuantity) *  price / 1000000000).toLocaleString()}
                              </td> 
                              <td className={styles.rowdata}>
                                {(((Number(row.TokenHolderQuantity) * 100/1000000000)/totalSupply)).toFixed(5)+"%"}
                              </td> 
                              {/* <td className={styles.rowdata}>{row.LastActivity}</td> */}
                              {/* <td className={styles.rowdata}>{row.Wallet_Address}</td>
                              <td className={styles.rowdata}>{row.Token}</td>
                              <td className={styles.rowdata}>{row.Value$}</td>
                              <td className={styles.rowdata}>{row.Value}</td> */}
                              {/* <td className={styles.rowdata}>{row.LastActivity}</td> */}
                            </tr>
                          )})) :
                          (<tr><td colSpan="4">No holders yet!</td></tr>)
                        }
                    </tbody>
                </table>
            </div>) :
            (<h4>Not Fetched Yet</h4>)
            }

            <div className={styles.more}>
                <a href={network === 'bsc' ? ("https://bscscan.com/token/"+tokenAddress+"#balances") : ("https://etherscan.com/token/"+tokenAddress+"#balances")}>
                  See All Holders
                </a>
            </div>
        </div>
        </>
    )
  }
