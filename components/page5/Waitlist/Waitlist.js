import React,{useState} from 'react'
import styles from './style.module.scss'
import Searchbar from '../../common/Searchbar/Searchbar'
import { symbol } from 'd3-shape'

export default function Waitlist() {
    const [email,setEmail]=useState("")
    const handleChange = e => {
        setEmail(e.target.value)
      }
    const subscribe = () =>{
        console.log(email)
    }
    return (
        <div className={styles.waitlist}>
            <p className={styles.heading}>Join to the waitlist</p>
            <div className={styles.row}>
                <div className={styles.input}>
                    <input type='email' required value={email} placeholder="youremail@gmail.com" onChange={handleChange} className={styles.inputtab}/>
                </div>
                <div className={styles.button}  onClick={subscribe}>
                    Join
                </div>
            </div>
        </div>
    )
}
