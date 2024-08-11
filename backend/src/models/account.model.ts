import { model, Schema } from 'mongoose';

const accountSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    balance: {
        type: Schema.Types.Mixed,
        required: true
    }
});

const Accounts = model('Account', accountSchema);
export default Accounts;