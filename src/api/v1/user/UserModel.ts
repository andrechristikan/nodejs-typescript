import { model, Schema } from 'mongoose';
import { NextFunction } from 'express';
import { hashPassword } from '../auth/AuthService';
import { UserDocument } from './UserInterface';

const tableName = 'users';

const userSchema = new Schema({
    country: {
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
userSchema.pre<UserDocument>('save', function save(next: NextFunction) {
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

userSchema.pre<UserDocument>('find', function save(next: NextFunction) {
    const user = this as UserDocument;
    if (user.email) {
        user.email = user.email.toLowerCase();
    }

    if (user.firstName) {
        user.firstName = user.firstName.toLowerCase();
    }
    if (user.lastName) {
        user.lastName = user.lastName.toLowerCase();
    }

    next();
});

userSchema.pre<UserDocument>('findOne', function save(next: NextFunction) {
    const user = this as UserDocument;
    if (user.email) {
        user.email = user.email.toLowerCase();
    }

    if (user.firstName) {
        user.firstName = user.firstName.toLowerCase();
    }
    if (user.lastName) {
        user.lastName = user.lastName.toLowerCase();
    }

    next();
});

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Default export
export default model<UserDocument>(tableName, userSchema);
