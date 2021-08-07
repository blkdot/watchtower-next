import React,{useState,useEffect} from 'react'
import styles from './style.module.scss'
import Card from '../../common/Card/Card'
import Router from 'next/router'
import axios from 'axios'

export default function CryptoCards() {
    const allTokens= () => {
        Router.push({
            pathname:'/Page2/'
        })
    }

    const [data,setdata]=useState([])
    
    useEffect(()=>{
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false`)
      .then(res => {
          setdata(res.data);
      })
    },[])
    return (
        <div className={styles.cryptocards}>
            <h1 className={styles.heading}>Top Tokens</h1>
            <div className={styles.tokengrid}>
            {data.slice(0,3).map((data,index)=>{
              return <Card detail={data}  key={index}/>
            })}
            </div>
            <div className={styles.redirect} onClick={allTokens}>Check All Tokens</div>
        </div>
    )
}
