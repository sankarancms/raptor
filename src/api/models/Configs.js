import { Schema } from 'mongoose'

const Configs = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true,
    }
});

export default Configs;
