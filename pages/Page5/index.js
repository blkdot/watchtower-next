import Head from 'next/head'
import React from 'react'
import Navbar from '../../components/common/NavBar/Navbar'
import Footer from '../../components/common/Footer/Footer'
import SwapLinks from '../../components/common/SwapLinks/SwapLinks.js'
import Routemap from '../../components/page1/Routemap/Routemap'
import NFT from '../../components/common/NFT/NFT'
import style from '../../styles/Home.module.css'
import Tokenomics from '../../components/page5/Tokenomics/Tokenomics'
import Header5 from '../../components/page5/Header5/Header5'
import Waitlist from '../../components/page5/Waitlist/Waitlist'
import styles from './style.module.scss'

export default function Index() {
    return (
        <>
      <Head>
        <title>WatchTower</title>
        <meta property="og:title" content="My page title" key="title" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/assets/logo.png" type="image/gif" sizes="16x16"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin ></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>      
      </Head>
      {/* style={{background:'url(/assets/home-bg.png)', backgroundRepeat:'repeat-x', width:'100%'}} */}
      <div className={style.container}>
        <Navbar active='more'/>
        <div className={styles.bg}>
        <img src='/assets/bg.svg' style={{position:'absolute',zIndex:'0'}} width="100%" height="auto"></img>
        <Header5/>
        <SwapLinks data={{'Name':"Coinmarketcap",
        'contract':"0xb124237895sdf768s7d6f8s6d5f5768sd7f676sdf767s8df", 
        'link':"tryit",
        'content':"The start up funds will be invested by the Creator and CEO of Watchtower and the dev team to provide reassurance that this project will be supported and followed through. ",
        'warning':"The start up funds will be invested by the Creator and CEO of Watchtower and the dev team to provide reassurance that this project will be supported and followed through. "
        }}/>
        </div>
        <Tokenomics/>
        <Routemap/>
        <NFT/>
        <Waitlist/>
        <Footer/>
        </div>
        </>
    )
}
