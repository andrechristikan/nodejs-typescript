import { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    country: Schema.Types.ObjectId;
    mobileNumber: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface UserBaseInterface extends UserDocument {
    fullName: string;
}


export interface UserFullInterface extends Document {
    country: {
        mobileNumberCode: string;
        countryCode: string;
        countryName: string;
    };
    mobileNumber: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
}

export interface UserMiniInterface extends Document {
    _id: Schema.Types.ObjectId;
}
