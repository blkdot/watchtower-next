import React from 'react'
import styles from './style.module.scss'

export default function Routemap() {
    
    // const routeMapButton=()=>{

    // }

    return (
        <div className={styles.routemap}>
            <div className={styles.left}>
                <h1 className={styles.heading}>Roadmap</h1>
                {/* <div className={styles.Button} onClick={routeMapButton}>Join Airdrop</div> */}
            </div>
            <div className={styles.img}>
                <img src='/assets/RoadMap-svg.svg' width='100%' height='auto' alt="roadmap" />
            </div>
        </div>
    )
}
