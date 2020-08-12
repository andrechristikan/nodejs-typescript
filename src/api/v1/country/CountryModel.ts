import { model, Schema } from 'mongoose';
import { CountryBaseInterface } from './CountyInterface';

const tableName = 'countries';

const countrySchema = new Schema({
    mobileNumberCode: {
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
export default model<CountryBaseInterface>(tableName, countrySchema);
