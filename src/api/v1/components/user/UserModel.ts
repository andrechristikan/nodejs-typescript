import { Error, Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';

interface UserDocument extends Document {
  name: {
    first: string;
    last?: string;
  };
  mobileNumber: string;
  password: string;
  email: string;

  open_account_reason: OpenAccountReason;
  source_of_fund: SourceOfFund;
  religion: Religion;
  job_code: JobCode;
  address_rt_rw_perum: string;
  home_phone_number: string;
  office_phone_number: string;
  fax_number: string;
}

enum OpenAccountReason {
  INVESTMENTS = 'For investment purposes',
  SAVINGS = 'For savings purposes',
  TRANSACTIONS = 'For transactional purposes'
}

enum SourceOfFund {
  SALARY = 'Salary',
  BUSINESS = 'Business outcome',
  INVESTMENT = 'Investment outcome',
  GRANTS = 'Grants/Hibah'
}

enum Religion {
  ISLAM	= 'Islam',
  CATHOLIC = 'Catholic',
  CHRISTIAN	= 'Christian (Protestant)',
  BUDDHIST = 'Buddhist',
  HINDU = 'Hindu',
  CONFUCIAN = 'Confucian',
  OTHERS = 'Others'
}

enum JobCode {
  GOVERNMENT_EMPLOYEE = 'Pegawai Negeri',
  PRIVATE_SECTOR_EMPLOYEE = 'Pegawai Swasta',
  STATE_OWNED_ENTERPRISE_EMPLOYEE = 'Pegawai BUMN/BUMD',
  NATIONAL_MILITARY_OR_POLICE_OFFICER = 'TNI/POLRI',
  BUSINESS_OWNER = 'Pengusaha',
  TRADER = 'Pedagang',
  FARMER_OR_FISHERMAN = 'Petani/Nelayan',
  STUDENT = 'Pelajar/Mahasiswa',
  HOUSEWIFE = 'Ibu Rumah Tangga',
  UNEMPLOYED = 'Tidak Bekerja',
  EMPLOYEE = 'Karyawan / Karyawati',
  ENTREPRENEUR = 'Wiraswasta',
  STATE_OFFICIAL = 'Pejabat Negara',
  ACCOUNTANT = 'Akuntan',
  LAWYER_OR_NOTARY = 'Pengacara/Notaris',
  PROFESSION = 'Profesi',
  RETIREE = 'Pensiunan',
  PRIVATE_LECTURER_OR_TEACHER = 'Dosen/Guru Swasta',
  PUBLIC_LECTURER_OR_TEACHER = 'Dosen/Guru Negeri',
  DOCTOR = 'Dokter',
  BNI_EMPLOYEE = 'Pegawai BNI',
  BNI_AFFILIATE_UNIT = 'Unit Afiliasi BNI',
  OTHERS = 'Lain-lain',
}

const userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
      },
      last: String,
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
    open_account_reason: {
      type: String,
      default: 'INVESTMENTS',
      required: true,
    },
    source_of_fund: {
      type: String,
      default: 'SALARY',
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    job_code: {
      type: String,
      required: true,
    },
    address_rt_rw_perum: {
      type: String,
      required: true,
    },
    home_phone_number: {
      type: String,
      required: true,
    },
    office_phone_number: {
      type: String,
      required: true,
    },
    fax_number: {
      type: String,
      required: true,
    },

  }
);

// Document middlewares
userSchema.pre<UserBaseInterface>('save', function save(next: NextFunction) {
  const user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(config('auth.saltRounds'), (err: any, salt: string) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, async (err: any, hash: string) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.virtual('fullName').get(function () {
  return this.name.first + this.name.last;
});


export interface UserBaseInterface extends UserDocument {
  fullName: string;
  comparePassword: comparePasswordFunction;
}

const comparePassword: comparePasswordFunction = function (
  candidatePassword,
  callback
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: Error, isMatch: boolean) => {
      callback(err, isMatch);
    }
  );
};

userSchema.methods.comparePassword = comparePassword;

// Default export
export default model<UserBaseInterface>('users', userSchema);
