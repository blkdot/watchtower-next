import Head from 'next/head'
import React,{useEffect} from 'react'
import Navbar from '../../components/common/NavBar/Navbar'
import Footer from '../../components/common/Footer/Footer'
import style from '../../styles/Home.module.css'
import Script from 'next/script'

 
export default function Index() {
  let data=[
  {
    "width": 980,
    "height": 610,
    "symbol": "BINANCE:ETHUSD",
    "interval": "60",
    "timezone": "Etc/UTC",
    "theme": "dark",
    "style": "1",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "save_image": false,
    "container_id": "tradingview_784a0"
   }
];

    useEffect(()=>{
      
    },[])
    
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
        {/* <script src="https://s3.tradingview.com/tv.js"></script>             */}
      </Head>
      <div className={style.container}>
          <Navbar active='market'/> 
              <div className="tradingview-widget-container">
                <div id="tradingview_784a0"></div> 
                 {/* {new window.TradingView.widget(data[0])}  */}
              </div> 
          <Footer/>
      </div>
        </>
    )
}
