import React from 'react'
import styles from './style.module.scss'

export default function ButtonsRow() {
    return (
        <div className={styles.buttonrow}>
            <a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x1967ABfdc4ae7961C5a8A5395469222260C27c02" target="_blank" rel="noopener noreferrer"><div className={styles.button}>BUY</div></a>
            <a href="" target="_blank" rel="noopener noreferrer"><div className={styles.button}>CHART</div></a>
            <a href="https://t.me/Watchtowercrypto" target="_blank" rel="noopener noreferrer"><div className={styles.button}>TELEGRAM</div></a>
            <a href="http://discord.gg/CEaNtSgbqT" target="_blank" rel="noopener noreferrer"><div className={styles.button}>DISCORD</div></a>
            <a href="https://home.babyswap.finance/farms" target="_blank" rel="noopener noreferrer"><div className={styles.button}>FARM</div></a>
        </div>
    )
}
