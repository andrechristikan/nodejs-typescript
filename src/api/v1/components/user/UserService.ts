import User, { UserBaseInterface } from './UserModel';
import { searchParams } from './UserHelper';

class UserService{
    public getOneById = async (data: getOneById): Promise<response> => {
        return new Promise( (resolve, reject) => {
            User.findById(data.id)
                .exec((err, user: UserBaseInterface) => {
                    if(err){ 
                        const response: response = responseStructureError(trans('app.internalServerError'));
                        reject(response); 
                    }else if(!user){
                        const response: response = responseStructureError(trans('user.get.not-found'));
                        resolve(response);
                    }
    
                    const response: response = responseStructureSuccess(trans('user.get.success'), user);
                    resolve(response);
                });
        });
    };

    public getOne = async (data: getOne): Promise<response> => {
        return new Promise( (resolve, reject) => {
            User.findOne({
                $or:[
                    {email: data.email},
                    {userName: data.userName}
                ]
            }).exec((err, user: UserBaseInterface) => {
                if(err){ 
                    const response: response = responseStructureError(trans('app.internalServerError'));
                    reject(response); 
                }else if(!user){
                    const response: response = responseStructureError(trans('user.get.not-found'));
                    resolve(response);
                }
    
                const response: response = responseStructureSuccess(trans('user.get.success'), user);
                resolve(response);
            });
        });
    };

    public getAll = async (data: getAll): Promise<response> => {
        const userParams = searchParams(data);
        return new Promise( (resolve, reject) => {
            User.find(userParams).exec((err, user: UserBaseInterface) => {
                if(err){ 
                    const response: response = responseStructureError(trans('app.internalServerError'));
                    reject(response); 
                }
    
                const response: response = responseStructureSuccess(trans('user.get.success'), user);
                resolve(response);
            });
        });
    };

    public store = async (data: store): Promise<response> => {
        const getOneUser: response = await this.getOne(data);
        return new Promise( (resolve, reject) => {
            const userData = getOneUser.data;
            if(userData){
                const response: response = responseStructureError(trans('user.get.exist'));
                reject(response);
            }else{
                const user = new User(data);
                user.save(function (err, user: UserBaseInterface) {
                    if(err) { 
                        const response: response = responseStructureError(trans('app.internalServerError'));
                        reject(response); 
                    }
        
                    const response: response = responseStructureSuccess(trans('user.create.success'), user);
                    resolve(response);
                });
            }
    
        });
    };
}



export const {store, getAll, getOne, getOneById} = new UserService(); 