import User, { UserBaseInterface } from './UserModel';
import { scopeUserExist, scopeUserExistIgnoreSpecific } from './UserScope';

class UserService{
    public getOneById: getOneUserByIdFunction = async (id: string): Promise<response> => {
        return new Promise( (resolve, reject) => {
            User.findById(id)
                .exec((err, user: UserBaseInterface) => {
                    if(err){ 
                        const response: response = responseStructureError(trans('app.internalServerError'));
                        reject(response); 
                    }else if(!user){
                        const response: response = responseStructureError(trans('user.get.notFound'));
                        reject(response);
                    }
    
                    const response: response = responseStructureSuccess(trans('user.get.success'), user);
                    resolve(response);
                });
        });
    };

    public getOne: getOneUserFunction = async (data: getOneUser): Promise<response> => {
        return new Promise( (resolve, reject) => {
            User.findOne(data)
                .exec((err, user: UserBaseInterface) => {
                    if(err){ 
                        const response: response = responseStructureError(trans('app.internalServerError'));
                        reject(response); 
                    }else if(!user){
                        const response: response = responseStructureError(trans('user.get.notFound'));
                        reject(response);
                    }
        
                    const response: response = responseStructureSuccess(trans('user.get.success'), user);
                    resolve(response);
                });
        });
    };

    public getAllExist: getAllUserExistFunction = async (data: getAllUserExist, id: string = null): Promise<response | responseList> => {
        const scope = id ? scopeUserExistIgnoreSpecific(data, id) : scopeUserExist(data) ;
        console.log(scope);
        const count: number = await User.countDocuments(scope);
        return new Promise( (resolve, reject) => {
            User.find(scope)
                .exec((err, user: UserBaseInterface) => {
                    if(err){ 
                        const response: response = responseStructureError(trans('app.internalServerError'));
                        reject(response); 
                    }
        
                    const response: responseList = responseStructureList(trans('user.get.exist'), count, user);
                    resolve(response);
                });
        });
    };

    public getAll: getAllUserFunction = async (data: getAllUser): Promise<response | responseList> => {
        const count: number = await User.countDocuments(data);
        return new Promise( (resolve, reject) => {
            User.find(data)
                .exec((err, user: UserBaseInterface) => {
                    if(err){ 
                        const response: response = responseStructureError(trans('app.internalServerError'));
                        reject(response); 
                    }
                    
                    const response: responseList = responseStructureList(trans('user.get.success'), count, user);
                    resolve(response);
                });
        });
    };

    public store: storeUserFunction = async (data: storeUser): Promise<response> => {
        const getAllUserExist: response| responseList = await this.getAllExist(data as getAllUserExist);
        return new Promise( (resolve, reject) => {
            const userExist: responseList = getAllUserExist as responseList;
            if(userExist.status === 1){
                reject(userExist);
            }else if(userExist.count){
                const response: response = responseStructureError(trans('user.get.exist'));
                reject(response);
            }else{
                const user = new User(data);
                user.save((err, user: UserBaseInterface) => {
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

    public update: updateUserFunction = async (id: string, data: updateUser): Promise<response> => {
        const user: response = await this.getOneById(id);
        const getAllUserExist: response| responseList = await this.getAllExist(data as getAllUserExist, id);

        logger.info('zzz');
        return new Promise( (resolve, reject) => {
            const userExist: responseList = getAllUserExist as responseList;
            logger.info('aaa');
            if(user.status === 1){
                logger.info('bbb');
                reject(user);
            }else if(userExist.status === 1){
                logger.info('ccc');
                reject(userExist);
            }else if(userExist.count > 0){
                logger.info('ddd');
                const response: response = responseStructureError(trans('user.get.exist'));
                reject(response);
            }else{
                logger.info('fff');
                const modelUser: UserBaseInterface = user.data;
                modelUser.update(data);

                const response: response = responseStructureSuccess(trans('user.update.success'), modelUser);
                resolve(response);
            }
        });
    };
}



export const {getAll, getOne, getAllExist, getOneById, store, update} = new UserService(); 