import React,{useState} from 'react'
import styles from './style.module.scss'
import Link from 'next/link'

export default function Navbar(active) {
    const [popup,setPopup]=useState(false)
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
            <Link href="/"><img src="/assets/logo-white.png" width="100%" height="auto" alt=""></img></Link>
            </div>
            <div className={styles.menubar}>
                <Link href="/"><p className={(active.active=='home')?styles.active:styles.menuitem}>Home</p></Link>
                <p className={(active.active=='market')?styles.active:styles.menuitem} style={{color: '#ADADAD'}}>Market Watch<br/>(Soon)</p>
                <p className={(active.active=='redzone')?styles.active:styles.menuitem}style={{color: '#ADADAD'}}>Red Zone<br/>(Soon)</p>
                <p className={(active.active=='more')?styles.active:styles.menuitem} onClick={()=>setPopup(!popup)}>More</p>
            </div>
            {popup && <div className={styles.popup}>
                <div className={styles.disabled} onClick={()=>setPopup(!popup)}>Exchange (soon)</div>
                <Link href="/Page5"><div className={styles.menuitem} onClick={()=>setPopup(!popup)}>WatchTower Token</div></Link>
                <div className={styles.disabled} onClick={()=>setPopup(!popup)}>Audit Zone (soon)</div>
                <Link href="/Page4"><div className={styles.menuitem} onClick={()=>setPopup(!popup)}>WatchTower Scanner</div></Link>
                <div className={styles.disabled} onClick={()=>setPopup(!popup)}>WatchTower Wallet (soon)</div>
                <div className={styles.disabled} onClick={()=>setPopup(!popup)}>NFT creator (soon)</div>
            </div>}
            <div className={styles.partition}></div>
            <div className={styles.buttons}>
                <div className={styles.login}>Login</div>
                <div className={styles.subscribe}>
                    <p className={styles.heading}>Connect Wallet</p>
                    <p className={styles.subheading}>Coming Soon</p>
                </div>
            </div>
        </nav>
    )
}
