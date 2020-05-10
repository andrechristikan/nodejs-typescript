import { Error, Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';


interface UserDocument extends Document {
  firstName: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
  gender: Gender;
}

enum Gender {
  Female = 0,
  Male = 1,
}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  userName: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0,
    required: true
  }
},{ timestamps: true });


// Document middlewares
userSchema.pre<UserBaseInterface>('save', function save(next: NextFunction) {
  const user = this as UserDocument;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(config('auth.saltRounds'), (err: any, salt: string) =>{
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, async (err: any, hash: string) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
  
});

userSchema.virtual('fullName').get(function() {
  return this.firstName + this.lastName;
});

userSchema.methods.getGender = function() {
  return this.gender > 0 ? 'Male' : 'Female';
};

export interface UserBaseInterface extends UserDocument {
  fullName: string;
  getGender(): string;
  comparePassword: comparePasswordFunction;
}


const comparePassword: comparePasswordFunction = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    callback(err, isMatch);
  });
};

userSchema.methods.comparePassword = comparePassword;



// Default export
export default model<UserBaseInterface>('users', userSchema);