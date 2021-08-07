import React, {useState,useEffect} from 'react'
import {Link} from 'next'
import Router from 'next/router'
import Searchbar from '../../common/Searchbar/Searchbar'
import styles from './style.module.scss'

export default function Header() {
    const [search,setSearch] = useState("");
    const SearchRedirect= () => {
        if(search)
        Router.push({
            pathname:'/Page4/token/'+search,
        })
    }
    return (
        <>
        <div className={styles.home}>
            <div className={styles.content}>
            <p className={styles.welcome}>Welcome To</p>
            <p className={styles.title}>Watchtower</p>
            <p className={styles.description}>The Anti-Scam utility, Smart Contract scanner and Rug Pull Finding formula. Join us as we promote crypto adopton and a safe marketplace on the moon.</p>
            <div className={styles.searchbar}>
            <Searchbar
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{flex:'0.75', marginRight:'0.7rem'}}
                placeholder={'Search Token Name/Contact Address'}
            />
                <div className={styles.button} onClick={SearchRedirect}> 
                    Search
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
