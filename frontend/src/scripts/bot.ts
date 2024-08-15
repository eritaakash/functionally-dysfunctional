export const robRandomAmount = (rob: Function, wallet: number) => {
    
    /* random number between 1 and wallet's balance */
    const amount = Math.floor(Math.random() * wallet) + 1;
    console.log('random:', amount, rob);

    if (rob) rob(amount);
}