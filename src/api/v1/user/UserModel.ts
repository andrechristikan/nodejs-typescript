import { Error, Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import {
    comparePassword as comparePasswordCrypto,
    hashPassword,
} from '../auth/AuthService';

interface UserDocument extends Document {
    countryId: Schema.Types.ObjectId;
    mobileNumber: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

const tableName = 'users';

const userSchema = new Schema({
    countryId: {
        type: Schema.Types.ObjectId,
        ref: 'countries',
        required: true,
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});

// Document middleware
userSchema.pre<UserBaseInterface>('save', function save(next: NextFunction) {
    const user = this as UserDocument;
    user.email = user.email.toLowerCase();
    user.firstName = user.firstName.toLowerCase();
    user.lastName = user.lastName.toLowerCase();

    if (!user.isModified('password')) {
        next();
    }

    hashPassword(user.password)
        .then((result: string) => {
            user.password = result;
            next();
        })
        .catch((err) => {
            next(err);
        });
});

userSchema.pre<UserBaseInterface>('find', function save(next: NextFunction) {
    const user = this as UserDocument;
    if(user.email){
        user.email = user.email.toLowerCase();
    }

    if(user.firstName){
        user.firstName = user.firstName.toLowerCase();
    }
    if(user.lastName){
        user.lastName = user.lastName.toLowerCase();
    }

    next();
});

userSchema.pre<UserBaseInterface>('findOne', function save(next: NextFunction) {
    const user = this as UserDocument;
    if(user.email){
        user.email = user.email.toLowerCase();
    }

    if(user.firstName){
        user.firstName = user.firstName.toLowerCase();
    }
    if(user.lastName){
        user.lastName = user.lastName.toLowerCase();
    }
    
    next();
});

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

export interface UserBaseInterface extends UserDocument {
    fullName: string;
    comparePassword: comparePassword;
}

const comparePassword: comparePassword = function (
    candidatePassword,
    callback
) {
    comparePasswordCrypto(candidatePassword, this.password)
        .then((result: boolean) => {
            callback(result);
        })
        .catch((err) => {
            callback(false);
        });
};

userSchema.methods.comparePassword = comparePassword;

// Default export
export default model<UserBaseInterface>(tableName, userSchema);
