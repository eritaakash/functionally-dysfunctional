const FlipCoin = (amount: number, balanceCtx: any, historyCtx: any) => {
    const { balance, setBalance } = balanceCtx;

    if (amount > balance.wallet) {
        return null;
    }

    const flip = Math.random() > 0.5 ? true : false;
    const win = flip ? amount*2 : -amount*2;

    setBalance({
        ...balance,
        wallet: (balance.wallet + win) < 0 ? 0 : balance.wallet + win
    });

    historyCtx.setHistory([
        ...historyCtx.data,
        {
            type: flip ? 3 : 6,
            amount: Math.abs(win),
            wallet: (balance.wallet + win) < 0 ? 0 : balance.wallet + win,
            bank: balance.bank,
            ts: new Date().getTime()
        }
    ]);

    return flip;
};

const Rob = (amount: number, balanceCtx: any, historyCtx: any) => {
    const { balance, setBalance } = balanceCtx;

    if (amount > balance.wallet) {
        return null;
    }

    const loss = amount;

    setBalance({
        ...balance,
        wallet: balance.wallet - Math.abs(loss) < 0 ? 0 : balance.wallet - Math.abs(loss)
    });

    historyCtx.setHistory([
        ...historyCtx.data,
        {
            type: 5,
            amount: loss,
            wallet: balance.wallet - loss,
            bank: balance.bank,
            ts: new Date().getTime()
        }
    ]);

    return true;
};

const SlotMachine = (amount: number, balanceCtx: any, historyCtx: any) => {
    const { balance, setBalance } = balanceCtx;

    if (amount > balance.wallet) {
        return null;
    }

    const win = Math.random() > 0.5 ? amount*5 : -amount*5;

    setBalance({
        ...balance,
        wallet: (balance.wallet + win) < 0 ? 0 : balance.wallet + win
    });

    historyCtx.setHistory([
        ...historyCtx.data,
        {
            type: (win > 0) ? 3 : 6,
            amount: Math.abs(win),
            wallet: balance.wallet + win,
            bank: balance.bank,
            ts: new Date().getTime()
        }
    ]);

    return win > 0;
};

const Beg = (amount: number, balanceCtx: any, historyCtx: any) => {
    const { balance, setBalance } = balanceCtx;

    if (amount > 500) {
        return null;
    }

    const win = amount;

    setBalance({
        ...balance,
        wallet: balance.wallet + win
    });

    historyCtx.setHistory([
        ...historyCtx.data,
        {
            type: 4,
            amount: win,
            wallet: balance.wallet + win,
            bank: balance.bank,
            ts: new Date().getTime()
        }
    ]);

    return true;
};


/* Export the Game Functions */
export default (balanceCtx: any, historyCtx: any) => {
    return {
        flipCoin: (amount: number) => FlipCoin(amount, balanceCtx, historyCtx),
        rob: (amount: number) => Rob(amount, balanceCtx, historyCtx),
        slotMachine: (amount: number) => SlotMachine(amount, balanceCtx, historyCtx),
        beg: (amount: number) => Beg(amount, balanceCtx, historyCtx),
    }
};