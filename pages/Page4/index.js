import React from 'react'
import Head from 'next/head'
import Search from '../../components/page4/Search/Search'
import Navbar from '../../components/common/NavBar/Navbar'

export default function index() {
    return (
        <>
        <Head>
            <title>WatchTower</title>
            <meta property="og:title" content="My page title" key="title" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" href="/assets/logo.png" type="image/gif" sizes="16x16"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" ></link>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>      
      </Head>
      <Navbar/>
        <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Search/>
        </div>
        </>
    )
}
