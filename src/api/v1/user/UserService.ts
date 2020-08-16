import userModel from './UserModel';
import {
    UserDocument,
    UserMiniInterface,
    UserBaseInterface,
    UserPasswordInterface,
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
                .exec((err: any, user: UserMiniInterface) => {
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
                .select('-password')
                .populate('country')
                .exec((err: any, user: UserBaseInterface) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(user);
                });
        });
    }

    public async getPasswordById(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            userModel
                .findById(id)
                .select('password')
                .exec((err: any, user: UserPasswordInterface) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(user.password);
                });
        });
    }

    public async store(data: userStore): Promise<UserDocument> {
        return new Promise((resolve, reject) => {
            const newUser = new userModel(data);
            newUser.save((err: any, user: UserDocument) => {
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
                .catch((err: any) => {
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
    getPasswordById,
} = new UserService();
