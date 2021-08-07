import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/page1/Header/Header' 
import CryptoCards from '../components/page1/CryptoCards/CryptoCards'
import Page1 from '../pages/Page1/index'

export default function Home() {
  return (<>
      <Head>
        <title>WatchTower</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="icon" href="/assets/logo.png" type="image/gif" sizes="16x16"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin ></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>            
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.container}>
        <Page1/>
      </div>
    </>
  )
}


// // <style>
// ::-webkit-scrollbar {
//   width: '5px';
// }

// -webkit-scrollbar-track {
// box-shadow: inset 0 0 5px grey;
// border-radius: 10px;
// }
// </style>