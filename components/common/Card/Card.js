import React from 'react'
import styles from './style.module.scss'
import Router from 'next/router'

export default function Card(detail) {
    const TokenPage=()=>{
        Router.push({
            pathname:'/Page4/token/'+detail.detail.symbol
        })
    }
return (
    <>
    <div className={styles.card}>
        <div className={styles.description}>
            <div className={styles.logo}>
                <img src={detail.detail.image} alt="" width="100%" height='auto'/>
            </div>
            <div className={styles.name}>
                <div className={styles.full}>{detail.detail.name}</div>
                <div className={styles.short}>{(detail.detail.symbol).toUpperCase()}</div>
            </div>
        </div>

        <div className={styles.graph}>
            <img src='/assets/graph.png' width='100%' height='auto' alt="graph"></img>
        </div>

        <div className={styles.priceinfo}>
            <div className={styles.subheading}>{'USD price'}</div>
            <div className={styles.price}>
            <div className={styles.value}>{"$"+detail.detail.current_price}</div>
            <div className={styles.percent}>{(detail.detail.market_cap_change_percentage_24h)+"%"}</div>
            </div>
        </div>

        <div className={styles.redirecttoken} onClick={TokenPage}>Read More on Token Page</div>
    </div>
    </>
    )

}
    
