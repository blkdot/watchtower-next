import React,{useState,useEffect} from 'react'
import styles from './style.module.scss'

export default function PoolInfo({
    network,
    tokenID,
    totalSupply,
    burnedAmount,
    liquidityPools, 
    pricesList
    }) {
    return (
        <div className={styles.poolInfo}>
            <p className={styles.heading}>
                Liquidity Pool Information
            </p>
            {
                totalSupply && burnedAmount && (
                <>
                    <p className={styles.text} style={{marginBottom:'5px'}}>
                        Market Cap : ${(totalSupply * pricesList[tokenID]).toLocaleString()}
                    </p>
                    <p className={styles.text}>
                        Total Supply : {totalSupply.toLocaleString()}
                    </p>
                </>
                )
            }

            { liquidityPools && (
                <>
                    {
                        liquidityPools.map((pool, poolId) => (
                            <div style={{marginBottom:'15px'}} key={poolId}>
                                <p className={styles.text} style={{marginBottom:'5px'}}>
                                    LP address ({tokenID.toUpperCase()} / {pool.symbol}) : &nbsp;
                                    <a 
                                        href={"https://" + (network === 'bsc' ? 'bscscan.com' : 'ethscan.io') +  "/address/" + pool.address}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.readmore}
                                    >
                                        {pool.address}
                                    </a>
                                </p>
                                {
                                    pool.locked.map(
                                        (item, itemId) => (
                                            <p className={styles.text} style={{marginBottom:'5px'}} key={itemId}>
                                                {item.symbol}:  {item.value.toLocaleString()} (${(pricesList[item.symbol] * item.value).toLocaleString()})
                                            </p>
                                        )
                                    )
                                }
                            </div>
                        ))
                    }
                </>
            )}

            {
                totalSupply && burnedAmount && (
                    <p className={styles.text} style={{marginBottom:'5px'}}>
                        Burned or locked: ${burnedAmount.toLocaleString()} ({(100 * burnedAmount / totalSupply).toFixed(2)}%)
                    </p>
                )
            }
        </div>
    )
}
