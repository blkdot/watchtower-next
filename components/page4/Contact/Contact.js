import { style } from '@material-ui/system'
import React from 'react'
import styles from './style.module.scss'

export default function Contact() {
    return (
        <div className={styles.contact}>
            <div className={styles.important}>Important</div>
            <div className={styles.flex}>
                <div className={styles.notice}>
                    Please contact us If you are the token owner and believe this information is incorrect.
                </div>
                <a href="mailto:support@cryptotower.io" className={styles.contact}>
                    Contact Us
                </a>
                <a href="mailto:support@cryptotower.io" className={styles.report}>
                    Or Report a Token
                </a>
            </div>
        </div>
    )
}
