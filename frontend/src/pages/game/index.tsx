import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from '@/styles/game.module.scss';

import { LineChart, Line } from 'recharts';

import BalanceHistory from '@/components/game/BalanceHistory';

import BalanceContext from '@/context/Balance';
import HistoryContext from '@/context/History';

import GameFunctions from '@/scripts/games';
import CurrencyFunctions from '@/scripts/currency';

import { robRandomAmount } from '@/scripts/bot';


const GameScreen = () => {

    const { balance, setBalance } = useContext(BalanceContext) as any;
    const { data, setHistory } = useContext(HistoryContext) as any;

    const [balData, setBalData] = useState(data);

    const [scripts, setScripts] = useState({
        games: GameFunctions({ balance, setBalance}, { data, setHistory}),
        currency: CurrencyFunctions({ balance, setBalance}, { data, setHistory})
    });

    const currencyRef = useRef<HTMLInputElement>(null);
    const flipCoinRef = useRef<HTMLInputElement>(null);
    const slotRef = useRef<HTMLInputElement>(null);
    const begRef = useRef<HTMLInputElement>(null);
    const historyGraph = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const asc = (a: any, b: any) => a.ts - b.ts;
        const history = data.sort(asc);

        const balData = history.map((item: any) => ({
            wallet: item.wallet,
            bank: item.bank
        }));

        setBalData(balData);
    }, [data]);

    
    useEffect(() => {
        setScripts({
            games: GameFunctions({ balance, setBalance}, { data, setHistory}),
            currency: CurrencyFunctions({ balance, setBalance}, { data, setHistory})
        });
    }, [balance, data]);


    useEffect(() => {
        if (historyGraph.current) {
            historyGraph.current.scrollLeft = historyGraph.current.scrollWidth;
        }
    }, [data]);

    useEffect(() => {
        const interval = 1000 * 15;
        const func = () => {
            robRandomAmount(scripts.games.rob, balance.wallet);
        }

        const id = setInterval(func, interval);

        return () => clearInterval(id);
    }, [scripts]);


    return (
        <main className={styles.main}>
            <section className={styles.bal}>
                <div>
                    <p>👛 {balance.wallet.toLocaleString()}</p>
                </div>

                <div>
                    <p>💳 {balance.bank.toLocaleString()}</p>
                </div>
            </section>

            <section className={styles.overview}>
                <div className={styles.ovChild}>
                    <div className={styles.transactionInfo}>
                        <span>&#x25A0; Wallet</span>
                        <span>&#x25A0; Bank</span>
                    </div>

                    <div className={styles.transactionContainer} ref={historyGraph}>
                        <LineChart width={ data.length > 0 ? data.length * 50 : 400 } height={200} data={balData}>
                            <Line type="monotone" dataKey="wallet" stroke="var(--clip-div-color-2)" dot={false} />
                            <Line type="monotone" dataKey="bank" stroke="var(--clip-div-color-1)" dot={false} />
                        </LineChart>
                    </div>

                    <BalanceHistory data={data} />
                </div>

                <div className={styles.ovChild}>
                    <input 
                        placeholder='Enter Amount...' 
                        type='number'
                        ref={currencyRef}
                    />

                    <div>
                        <button onClick={() => {
                            scripts.currency.deposit(+(currencyRef.current as any).value);
                            if (currencyRef.current) {
                                currencyRef.current.value = '';
                            }
                        }
                        }>Deposit</button>

                        <button onClick={() => {
                            scripts.currency.withdraw(+(currencyRef.current as any).value);
                            if (currencyRef.current) {
                                currencyRef.current.value = '';
                            }
                        }}>Withdraw</button>
                    </div>
                </div>
            </section>

            <section className={styles.games}>
                <div className={styles.flip_coin}>
                    <span>💸 Flip a Coin</span>
                    <p>50% Chance to Win/Lose 2x the amount</p>

                    <input 
                        placeholder='Enter Amount...' 
                        type='number'
                        ref={flipCoinRef}
                    />

                    <button onClick={() => {
                        scripts.games.flipCoin(+(flipCoinRef.current as any).value);
                        if (flipCoinRef.current) flipCoinRef.current.value = '';
                    }
                    }>Flip</button>
                </div>

                <div className={styles.slot}>
                    <span>🎰 Slot Machine</span>
                    <p>25% Chance to Win 5x the amount</p>

                    <input 
                        placeholder='Enter Amount...' 
                        type='number'
                        ref={slotRef}
                    />

                    <button onClick={() => {
                        scripts.games.slotMachine(+(slotRef.current as any).value);
                        if (slotRef.current) slotRef.current.value = '';
                    }}>Spin</button>
                </div>

                <div className={styles.beg}>
                    <span>🥺 Beg</span>
                    <p>100% Chance to Win 1x the amount</p>
                    <input 
                        placeholder='Max. 500' 
                        type='number'
                        ref={begRef}
                    />
                    <button onClick={() => {
                        scripts.games.beg(+(begRef.current as any).value);
                        if (begRef.current) begRef.current.value = '';
                    }}>Beg</button>
                </div>
            </section>
        </main>
    );
};

export default GameScreen;