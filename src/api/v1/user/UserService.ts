import userModel from './UserModel';
import { UserBaseInterface, UserMiniInterface } from './UserInterface';
import { getById as countryGetById } from '../country/CountryService';

class UserService {
    public async getByEmail(email: string): Promise<UserMiniInterface> {
        return new Promise((resolve, reject) => {
            userModel
                .findOne(
                    {
                        email: email.toLowerCase(),
                    },
                    { _id: 1 }
                )
                .exec((err: any, user: UserMiniInterface) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(user);
                });
        });
    }

    public async getByMobileNumber(
        mobileNumber: string
    ): Promise<UserMiniInterface> {
        return new Promise((resolve, reject) => {
            userModel
                .findOne(
                    {
                        mobileNumber: mobileNumber,
                    },
                    { _id: 1 }
                )
                .exec((err, user: UserMiniInterface) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(user);
                });
        });
    }

    public async getById(id: string): Promise<UserBaseInterface> {
        return new Promise((resolve, reject) => {
            userModel
                .findById(id)
                .populate('countries')
                .exec((err, user: UserBaseInterface) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(user);
                });
        });
    }

    public async store(data: userStore): Promise<UserBaseInterface> {
        return new Promise((resolve, reject) => {
            countryGetById(data.country).then((countyCode) => {
                data.country = countyCode._id;
                const newUser = new userModel(data);
                newUser.save((err, user: UserBaseInterface) => {
                    if (err) {
                        reject(
                            new APIError(Enum.SystemErrorCode.SIGN_UP_FAILED)
                        );
                    }

                    resolve(user);
                });
            });
        });
    }
}

export default UserService;
export const {
    getByEmail,
    getByMobileNumber,
    store,
    getById,
} = new UserService();
