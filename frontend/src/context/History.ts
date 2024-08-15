import { createContext } from 'react';

interface HistoryContextProps {
    data: {
        type: number;
        amount: number;
        wallet: number;
        bank: number;
    }[];
    setHistory: (data: any) => void;
};

const HistoryContext = createContext<HistoryContextProps | null>(null);
export default HistoryContext;