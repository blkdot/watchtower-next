import React from 'react'
import styles from './style.module.scss'

export default function SwapLinks(data) {
    const copyToClipboard=()=>{
        navigator.clipboard.writeText(data.data.contract)
        // window.clipboardData.setData("Text",data.data.contract)
    }
    return (
        <div className={styles.pancake}>
            <div className={styles.left}>
                <div className={styles.heading}>{"Find us on "+data.data.Name}</div>
                <div className={styles.content}>{data.data.content}</div>
                <div className={styles.title}>Contract</div>
                <div className={styles.toCopy} onClick={copyToClipboard}>
                    <div className={styles.value}>{data.data.contract}</div>
                    <div className={styles.copybutton} onClick={copyToClipboard}>
                        <img src="/assets/copy.svg" width="auto" height="80%" alt=""/>
                    </div>
                </div>
                <div className={styles.warning}>{data.data.warning}</div>
            </div>
            <div className={styles.right}>
                <div className={styles.card}>
                    <div className={styles.logo}>
                        <img src='/assets/logo.png' width='100%' height='auto' alt=''></img>
                    </div>
                    <div className={styles.token}>Watch Tower Token</div>
                    <div className={styles.nickname}>WTW (Bep20)</div>
                </div>
                <a href={'https://exchange.pancakeswap.finance/#/swap?inputCurrency='+data.data.contract} target="_blank" rel="noreferrer"><div className={styles.button}>
                    Buy on Pancake Swap
                </div></a>
            </div>
        </div>
    )
}
