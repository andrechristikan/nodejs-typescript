import { Document } from 'mongoose';

export interface CountryInterface extends Document {
    code: string;
    country: string;
}
