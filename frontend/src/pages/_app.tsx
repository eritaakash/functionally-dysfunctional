import React, { useState, useEffect } from 'react';

import { AppProps } from 'next/app';
import '@/styles/globals.css';

import BalanceContext from '@/context/Balance';
import HistoryContext from '@/context/History';

function MyApp({ Component, pageProps }: AppProps) {

    const [balance, setBalance] = useState({
        wallet: 0,
        bank: 0
    } as any);

    const [history, setHistory] = useState([
        {
            type: 1,
            amount: 0,
            wallet: 0,
            bank: 0,
            ts: new Date().getTime() - 10
        },
        {
            type: 0,
            amount: 1000,
            wallet: 1000,
            bank: 0,
            ts: new Date().getTime()
        },
    ] as any[]);

    useEffect(() => {
        const data = localStorage.getItem('game-history');

        if (data) {
            setHistory(JSON.parse(data));
        }

        const bal = localStorage.getItem('game-balance');

        if (bal) {
            const values = JSON.parse(bal);
            setBalance(values);

        } else {
            setBalance({
                wallet: 1000,
                bank: 0
            })
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('game-history', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        localStorage.setItem('game-balance', JSON.stringify(balance));
    }, [balance]);

    return (
        <BalanceContext.Provider value={{ balance, setBalance }}>
            <HistoryContext.Provider value={{ data: history, setHistory }}>
                <Component {...pageProps} />
            </HistoryContext.Provider>
        </BalanceContext.Provider>
    );
};

export default MyApp;