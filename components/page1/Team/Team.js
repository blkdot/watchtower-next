import React,{useState} from 'react'
import styles from './style.module.scss'
import Teams from '../../../data/data.json'

export default function Team() {
    const[allTeam, SetallTeam] = useState(false)
    const[main, Setmain] = useState(4)
    const setAll=()=>{
        SetallTeam(!allTeam)
        Setmain((main==4)?Teams['team'].length:4)
    }
    return (
        <div className={styles.team}>
            <h1 className={styles.heading}>WatchTower Team</h1>
            <div className={styles.grid}>
                {Teams['team'].slice(0,main).map((member,index)=>{
                    return(
                        <div className={styles.card} key={index}>
                            <div className={styles.image}>
                                <img src={member.image} width="100%" height="auto" alt="member" />
                            </div>
                            <div className={styles.name}>{member.name}</div>
                            <div className={styles.post}>{member.post}</div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.checkall} onClick={setAll}>
                {allTeam? "See the Team Leads" : "See the Whole Team"}
            </div>
        </div>
    )
}
