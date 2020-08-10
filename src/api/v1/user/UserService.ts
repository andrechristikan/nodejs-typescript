import userModel from './UserModel';
import { UserBaseInterface } from './UserInterface';
import { getById as countryGetById } from '../country/CountryService';

class UserService {
    public getByEmail = async (email: string): Promise<UserBaseInterface> => {
        return new Promise((resolve, reject) => {
            userModel
                .findOne({
                    email: email.toLowerCase(),
                })
                .exec((err: any, user: UserBaseInterface) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(user);
                });
        });
    };

    public getByMobileNumber = async (
        mobileNumber: string
    ): Promise<UserBaseInterface> => {
        return new Promise((resolve, reject) => {
            userModel
                .findOne({
                    mobileNumber: mobileNumber,
                })
                .exec((err, user: UserBaseInterface) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(user);
                });
        });
    };

    public store = async (data: userStore): Promise<UserBaseInterface> => {
        return new Promise(async (resolve, reject) => {
            countryGetById(data.countryId).then((countyCode) => {
                data.countryId = countyCode._id;
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
    };
}

export default UserService;
export const { getByEmail, getByMobileNumber, store } = new UserService();
