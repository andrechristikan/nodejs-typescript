import { model, Schema } from 'mongoose';
import { CountryInterface } from './CountyInterface';

const tableName = 'countries';

const userSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    countryCode: {
        type: String,
        unique: true,
        required: true,
    },
    countryName: {
        type: String,
        required: true,
    },
});

// Default export
export default model<CountryInterface>(tableName, userSchema);
