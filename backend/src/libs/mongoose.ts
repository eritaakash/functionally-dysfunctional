import mongoose from 'mongoose';

export const connectToDatabase = async (connectionUri: string) => {
    await mongoose.connect(connectionUri);
    console.log('[!]: Connected to Database');
};