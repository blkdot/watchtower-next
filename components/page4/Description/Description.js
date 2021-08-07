import React,{useState,useEffect} from 'react'
import styles from './style.module.scss'

const lowRisk="This Token is identified as low risk due to a number of factors which can include, lower price impact of top holders, locked Liquidty pool, safe contract code and renounced contract."
const mediumRisk="Identified risks can include Top Holder % can drastically affect the price of the token, Liquidity pool lock status, contract similarities with scams. Invest with Caution."
const highRisk="Rug Pull and scam risks identified and can include drastically high price impact of top holders, unlocked liquidity, Mint functionality in smart contract and contract identical to other scam contracts. Do not invest without certainty that this is not a scam!"

export default function Description({
  totalSupply, 
  burnedAmount, 
  top5HoldersPercentage,
  riskRating,
  imageUrl
}) {
  const[verdict,setVerdict] = useState("")
  const[color,setColour] = useState("") //green #C53347 red yellow
  const[reason,setReason] = useState("")

  useEffect(() => {
    if(riskRating<7.5 && riskRating>=4.0) {
      setColour('#D49535')
      setVerdict("Medium")
      setReason(mediumRisk)
    } else if(riskRating<4.0) {
      setColour('#C53347')
      setVerdict("High")
      setReason(highRisk)
    } else {
      setColour('#03B8B3')
      setVerdict("Low")
      setReason(lowRisk)
  }}, [riskRating]);
   
  return (
    (totalSupply && burnedAmount && top5HoldersPercentage!=-1) ?
    (<div className={styles.description}>
        <div className={styles.left}>
            <img src={imageUrl} width="100%" alt="Token Image"></img>
        </div>
        <div className={styles.right}>
          <div className={styles.flexRating}>
            <img src="/assets/watchtower-logo.png" width="30px" height="auto" alt="logo"></img>
            <div className={styles.ratingHeading}>WatchTower Risk Rating:</div>
            <span className={styles.verdict} style={{backgroundColor:color}}>
              {verdict}
            </span>
            <div className={styles.rating} style={{color:color}}>
              {riskRating}/10.0
            </div>
          </div>
          <div className={styles.reason} style={{marginBottom:'10px'}}>Reason:</div>
          <div className={styles.reason}>{reason}</div>
          <div className={styles.readmore}><a href="#graph" >See Below</a></div>
        </div>
      </div>) :
      (<h4>Not Fetched Yet</h4>)
  )
}
