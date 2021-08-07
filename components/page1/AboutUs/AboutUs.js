import React from 'react'
import styles from './style.module.scss'
import Router from 'next/router'

export default function AboutUs() {
    const readMore=()=>{
        Router.push({
            pathname:'/Page2/'
        })
    }
    return (
        <div className={styles.aboutus}>
            <div className={styles.left}>
                <img src='/assets/Aboutus.png' width='100%' height='auto' alt=""></img>
            </div>
            <div className={styles.right}>
                <p className={styles.heading}>About Us</p>
                <p className={styles.content}>Watchtower was founded in 2021 to combat Scamming activity in the De-centralized Cryptocurrency exchange space.</p>
                <p className={styles.content}>Watchtower focuses on identifying Scam and high-risk tokens to prevent monetary loss to Cryptocurrency investors.</p>
                <p className={styles.content}>By Utilizing our Token summaries, Graphs, Smart Contract reviews and risk ratings, Investors can Identify and avoid potential Scams and High risk tokens.</p>
                <p className={styles.content}>In order to protect investors and assist with the adoption of Blockchain, Watchtower will provide the Anti-Scam utility for the benefit of the whole Blockchain community at no cost.</p>
                <p className={styles.readmore} onClick={readMore}>Read More</p>
            </div>
        </div>
    )
}
