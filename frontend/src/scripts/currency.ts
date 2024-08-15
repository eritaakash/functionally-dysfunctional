const Deposit = (amount: number, balanceCtx: any, historyCtx: any) => {
    const { balance, setBalance } = balanceCtx;

    if (amount > balance.wallet) {
        return null;
    };

    setBalance({
        bank: balance.bank + amount,
        wallet: balance.wallet - amount,
    });

    historyCtx.setHistory([
        ...historyCtx.data,
        {
            type: 1,
            amount,
            wallet: balance.wallet - amount,
            bank: balance.bank + amount,
            ts: new Date().getTime(),
        }
    ]);

    return true;
};


const Withdraw = (amount: number, balanceCtx: any, historyCtx: any) => {
    const { balance, setBalance } = balanceCtx;

    if (amount > balance.bank) {
        return null;
    };

    setBalance({
        bank: balance.bank - amount,
        wallet: balance.wallet + amount,
    });

    historyCtx.setHistory([
        ...historyCtx.data,
        {
            type: 2,
            amount,
            wallet: balance.wallet + amount,
            bank: balance.bank - amount,
            ts: new Date().getTime(),
        }
    ]);

    return true;
};


/* Export the Balance Functions */
export default (balanceCtx: any, historyCtx: any) => {
    return {
        deposit: (amount: number) => Deposit(amount, balanceCtx, historyCtx),
        withdraw: (amount: number) => Withdraw(amount, balanceCtx, historyCtx),
    }
};