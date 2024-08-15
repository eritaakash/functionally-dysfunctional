import { createContext } from 'react';

interface BalanceContextProps {
    balance: {
        wallet: number;
        bank: number;
    };
    
    setBalance: (data: any) => void;
};

const BalanceContext = createContext<BalanceContextProps | null>(null);
export default BalanceContext;