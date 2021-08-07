import React from 'react'
import styles from './style.module.scss'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerlogo}>
                <img src="/assets/logo-white.png" width="100%" height="auto" alt=""></img>
            </div>
            <div className={styles.mail}>Contact: <a href="mailto:support@cryptotower.io" className={styles.link}>support@cryptotower.io</a></div>
            <div className={styles.social}>
                <p className={styles.heading}>Socials: </p>
                <p className={styles.icon}>
                    <a href="https://twitter.com/Watchtower_WTW" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/twitter.svg" width='40px' height='auto' alt="twitter" />
                    </a>
                </p>
                <p className={styles.icon}>
                    <a href="https://t.me/Watchtowercrypto" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/telegram.svg" width='40px' height='auto' alt="telegram" />
                    </a>
                </p>
                <p className={styles.icon}>
                    <a href="https://www.instagram.com/watchtower_wtw/" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/instagram.svg" width='50px' height='auto' alt="instagram" />
                    </a>
                </p>
                <p className={styles.icon}>
                    <a href="https://medium.com/@Watchtower_WTW" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/medium.svg" width='40px' height='auto' alt="medium" />
                    </a>
                </p>
                <p className={styles.icon}>
                    <a href="http://discord.gg/CEaNtSgbqT" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/discord.svg" width='40px' height='auto' alt="discord" />
                    </a>
                </p>
            </div>
        </footer>
    )
}
