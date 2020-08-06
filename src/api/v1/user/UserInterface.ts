import { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    countryId: Schema.Types.ObjectId;
    mobileNumber: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface UserBaseInterface extends UserDocument {
    fullName: string;
}
