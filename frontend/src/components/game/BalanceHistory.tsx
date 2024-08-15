import React, { useEffect } from 'react';
import styles from '@/styles/game.module.scss';

interface BalanceHistoryProps {
    data: {
        type: number;
        amount: number;
        wallet: number;
        bank: number;
        ts: number;
    }[];
}

const actionTypes: any = {
    0: {
        label: 'Rewarded',
        symbol: '+'
    },

    1: {
        label: 'Deposited',
        symbol: ''
    },

    2: {
        label: 'Withdrawn',
        symbol: ''
    },

    3: {
        label: 'Won a Game',
        symbol: '+'
    },

    4: {
        label: 'Begged for Money',
        symbol: '+'
    },

    5: {
        label: 'Got Robbed',
        symbol: '-'
    },

    6: {
        label: 'Lost a Game',
        symbol: '-'
    }
}

const BalanceHistory: React.FC<BalanceHistoryProps> = ({ data }) => {

    const isLoss = (type: number) => [5, 6].includes(type);
    const asc = (a: any, b: any) => b.ts - a.ts;

    const history = data.sort(asc);

    return (
        <div className={styles.balanceHistory}>
            {history.map((item: any, idx: number) => (
                <div key={idx}>
                    <span 
                        className={ isLoss(item.type) ? styles.loss : ''}
                    >{actionTypes[item.type].symbol}{item.amount}</span>

                    <p>{actionTypes[item.type].label}</p>
                </div>
            ))}
        </div>
    );
};

export default BalanceHistory;