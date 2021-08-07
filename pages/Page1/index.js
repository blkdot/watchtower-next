import React,{useState} from 'react'
import Header from '../../components/page1/Header/Header' 
import CryptoCards from '../../components/page1/CryptoCards/CryptoCards'
import AboutUs from '../../components/page1/AboutUs/AboutUs'
import styles from './style.module.scss'
import SwapLinks from '../../components/common/SwapLinks/SwapLinks.js'
import Footer from '../../components/common/Footer/Footer'
import Team from '../../components/page1/Team/Team'
import Routemap from '../../components/page1/Routemap/Routemap'
import Navbar from '../../components/common/NavBar/Navbar'
import NFT from '../../components/common/NFT/NFT'
import ButtonsRow from '../../components/page1/ButtonsRow/ButtonsRow'

export default function index() {
    return (
        <>
        <Navbar active="home"/>
        <div className={styles.headcard}>
            <Header/>
            <ButtonsRow/>
            <CryptoCards/>
        </div>
        <AboutUs/>
        <Routemap/>
        <Team/>
        <SwapLinks data={{'Name':"Pancake Swap",
        'contract':"0x1967ABfdc4ae7961C5a8A5395469222260C27c02", 
        'link':"https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x1967ABfdc4ae7961C5a8A5395469222260C27c02",
        'content':"The Watchtower Private and Pre-sales have been completed with Liquidity supplied to Pancake Swap and Locked for a minimum of 2 years. Developers and Creators only retain a small % ensuring safety from a Rug Pull scenario.",
        'warning':"Please allow for 10-12% Slippage to cover the Tokenomics of 10% (3% Reflection, 3% Locked Liquidity, 2% Burn, 2% R&D Wallet. "
        }}/>
        <NFT/>
        <Footer/>
        </>
    )
}
