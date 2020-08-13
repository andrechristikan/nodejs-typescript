import userModel from './UserModel';
import {
    UserBaseInterface,
    UserMiniInterface,
    UserFullInterface,
} from './UserInterface';

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

    public async getById(id: string): Promise<UserFullInterface> {
        return new Promise((resolve, reject) => {
            userModel
                .findById(id)
                .populate('countries')
                .exec((err, user: UserFullInterface) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(user);
                });
        });
    }

    public async store(data: userStore): Promise<UserBaseInterface> {
        return new Promise((resolve, reject) => {
            const newUser = new userModel(data);
            newUser.save((err, user: UserBaseInterface) => {
                if (err) {
                    reject(err);
                }

                resolve(user);
            });
        });
    }

    public async checkExist(
        email: string,
        mobileNumber: string
    ): Promise<Array<rawErrorMessage>> {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getByEmail(email),
                this.getByMobileNumber(mobileNumber),
            ])
                .then(([userEmail, userMobile]) => {
                    const validated: Array<rawErrorMessage> = [];
                    if (userMobile) {
                        validated.push({
                            code: Enum.SystemErrorCode.USER_MOBILE_NUMBER_EXIST,
                            field: 'mobileNumber',
                        });
                    }
                    if (userEmail) {
                        validated.push({
                            code: Enum.SystemErrorCode.USER_EMAIL_EXIST,
                            field: 'email',
                        });
                    }

                    resolve(validated);
                })
                .catch((err) => {
                    reject(err);
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
    checkExist,
} = new UserService();
