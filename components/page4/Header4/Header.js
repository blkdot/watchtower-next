import React from 'react'
import styles from './style.module.scss'
import toText from '../../../utils/toText'

export default function Header({
    tokenCode,
    name,
    description,
    imageUrl,
    tokenSite
}) {
    return (
        <div className={styles.tokeninfo}>
            <div className={styles.text}>
                <div className={styles.index}>
                    <div className={styles.heading}>Symbol:</div>
                    <div className={styles.title}>{tokenCode}</div>
                </div>
                <div className={styles.name}>{name}</div>
                <div className={styles.about}>{toText(description)}</div>
                <a href={tokenSite} target="_blank" rel="noreferrer" className={styles.button}>
                    Token Website
                </a>
            </div>
            <div className={styles.tokenlogo}>
                <img src={imageUrl}  width="100%" height="auto" alt={tokenCode} />
            </div>
        </div>
    )
}
