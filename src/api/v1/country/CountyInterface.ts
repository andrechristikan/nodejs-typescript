import { Document } from 'mongoose';

export interface CountryBaseInterface extends Document {
    mobileNumberCode: string;
    countryCode: string;
    countryName: string;
}
