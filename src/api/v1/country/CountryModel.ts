import { Document, model, Schema } from 'mongoose';

interface CountryInterface extends Document {
    code: string;
    country: string;
}

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
        unique: true,
        required: true,
    },
});

// Default export
export default model<CountryInterface>(tableName, userSchema);
