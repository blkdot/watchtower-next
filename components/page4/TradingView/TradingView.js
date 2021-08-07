import React, {useEffect, useRef, useState} from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'

import styles from './style.module.scss'

export default function TradingView({network, tokenAddress, pricesHistory}) {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  const [lineSeries, setLineSeries] = useState()
  const [volumeSeries, setVolumeSeries] = useState()

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#141416',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });

    setLineSeries(chart.current.addLineSeries({
      lineWidth: 1
    }))

    setVolumeSeries(chart.current.addHistogramSeries({
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0
      }
    }))
  }, []);

  useEffect(() => {
    if (!lineSeries || !volumeSeries) return
    lineSeries.setData([])
    volumeSeries.setData([])

    pricesHistory.forEach(trade => {
      lineSeries.update({
        time: trade['timeInterval']['minute'],
        value: parseFloat(trade.close),
      })

      let open = parseFloat(trade.open)
      let close = parseFloat(trade.close)
      volumeSeries.update({
        open,
        close,
        high: parseFloat(trade.high),
        low: parseFloat(trade.low),
        time: trade['timeInterval']['minute'],
        value: Math.abs(open-close),
        color: open > close ? "rgba(255, 128, 159, 0.25)" : "rgba(107, 255, 193, 0.25)"
      })
    })
  }, [lineSeries, volumeSeries, pricesHistory])

/*
  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      console.log('width: ', width, 'height: ', height)
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);
*/
  return (
    <div>
      <div ref={chartContainerRef} className={styles.tradingview} />
    </div>
  );
}
