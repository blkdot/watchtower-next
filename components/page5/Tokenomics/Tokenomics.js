import React from 'react'
import styles from './style.module.scss'
import Router from 'next/router'

export default function Tokenomics() {
    const readMore=()=>{
        Router.push({
            pathname:'/Page2/'
        })
    }
    return (
        <div className={styles.tokenomics}>
            <div className={styles.left}>
                <img src='/assets/pg5-tele.png' width='100%' height='auto' alt=""></img>
            </div>
            <div className={styles.right}>
                <p className={styles.heading}>Tokenomics</p>
                <p className={styles.content}>Crypto Watchtower was created to help people make informed decisions about Crypto investing.Watchtower primarily will focus on identifying Scam and high-risk tokens to prevent monetary loss to new and inexperienced Crypto investors.</p>
                <p className={styles.content}>Utilising our Charts, Smart Contract audits and future exchange platform, Watchtower seeks to provide early detection of Scams and share this knowledge freely and openly to the Cryptocurrency community.</p>
                <p className={styles.readmore} onClick={readMore}>Read More</p>
            </div>
        </div>
    )
}
