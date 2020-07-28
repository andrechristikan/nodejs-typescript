// import User, { UserBaseInterface } from './UserModel';
// import { userExist, userExistIgnoreId, userSearchList } from './UserScope';
// import { getSkip, getLimit } from '../../../../helpers/ListHelper';

// class UserService{
//     public getOneUserByIdService: getOneUserByIdService = async (id: string): Promise<response> => {
//         return new Promise( (resolve, reject) => {
//             User.findById(id)
//                 .exec((err, user: UserBaseInterface) => {
//                     if(err){ 
//                         const response: response = responseStructureError(trans('app.internalServerError'));
//                         reject(response); 
//                     }else if(!user){
//                         const response: response = responseStructureError(trans('user.get.notFound'));
//                         reject(response);
//                     }
    
//                     const response: response = responseStructureSuccess(trans('user.get.success'), user);
//                     resolve(response);
//                 });
//         });
//     };

//     public getOneUserService: getOneUserService = async (data: getOneUser): Promise<response> => {
//         const userScope: any = userExist(User, data.mobileNumber, data.email);
//         return new Promise( (resolve, reject) => {
//             userScope.findOne()
//                 .exec((err: any, user: UserBaseInterface) => {
//                     if(err){ 
//                         const response: response = responseStructureError(trans('app.internalServerError'));
//                         reject(response); 
//                     }else if(!user){
//                         const response: response = responseStructureError(trans('user.get.notFound'));
//                         reject(response);
//                     }
        
//                     const response: response = responseStructureSuccess(trans('user.get.success'), user);
//                     resolve(response);
//                 });
//         });
//     };

//     public getAllUserExistService: getAllUserExistService = async (data: getAllUserExist, id: string = null): Promise<response | responseList> => {
//         const userScope: any = id ? userExistIgnoreId(User, id, data.mobileNumber, data.email) : userExist(User, data.mobileNumber, data.email);
//         return new Promise( (resolve, reject) => {
//             userScope.find()
//                 .exec((err: any, user: UserBaseInterface) => {
//                     if(err){ 
//                         const response: response = responseStructureError(trans('app.internalServerError'));
//                         reject(response); 
//                     }
        
//                     const response: response = responseStructureSuccess(trans('user.get.exist'), user);
//                     resolve(response);
//                 });
//         });
//     };

//     public getAllUserService: getAllUserService = async (data: getAllUser, page: number, limit: number): Promise<response | responseList> => {
//         const userScope: any = userSearchList(User, data.name.first, data.name.last, data.mobileNumber, data.email);
//         const count: number = await userScope.countDocuments();
//         const skip: number = getSkip(page);
//         const dataOnPage: number = getLimit(limit);
//         return new Promise( (resolve, reject) => {
//             userScope.find()
//                 .skip(skip)
//                 .limit(dataOnPage)
//                 .sort({ createdDate: -1 })
//                 .exec((err: any, user: UserBaseInterface) => {
//                     if(err){ 
//                         const response: response = responseStructureError(trans('app.internalServerError'));
//                         reject(response); 
//                     }
                    
//                     const response: responseList = responseStructureList(trans('user.get.success'), count, user, page);
//                     resolve(response);
//                 });
//         });
//     };

//     public storeUserService: storeUserService = async (data: storeUser): Promise<response> => {
//         const getAllUserExist: response| responseList = await this.getAllUserExistService(data as getAllUserExist);
//         return new Promise( (resolve, reject) => {
//             const userExist: responseList = getAllUserExist as responseList;
//             if(userExist.status === 1){
//                 reject(userExist);
//             }else if(userExist.data.length){
//                 const response: response = responseStructureError(trans('user.get.exist'));
//                 reject(response);
//             }else{
//                 const user = new User(data);
//                 user.save((err, user: UserBaseInterface) => {
//                     if(err) { 
//                         const response: response = responseStructureError(trans('app.internalServerError'));
//                         reject(response); 
//                     }
        
//                     const response: response = responseStructureSuccess(trans('user.create.success'), user);
//                     resolve(response);
//                 });
//             }
    
//         });
//     };

//     public updateUserService: updateUserService = async (id: string, data: updateUser): Promise<response> => {
//         // const user: response = await this.getOneUserByIdService(id);
//         const getAllUserExist: response| responseList = await this.getAllUserExistService(data as getAllUserExist, id);

//         logger.info('zzz');
//         return getAllUserExist;
//         // return new Promise( (resolve, reject) => {
//         //     const userExist: responseList = getAllUserExist as responseList;
//         //     logger.info('aaa');
//         //     if(user.status === 1){
//         //         logger.info('bbb');
//         //         reject(user);
//         //     }else if(userExist.status === 1){
//         //         logger.info('ccc');
//         //         reject(userExist);
//         //     }else if(userExist.count > 0){
//         //         logger.info('ddd');
//         //         const response: response = responseStructureError(trans('user.get.exist'));
//         //         reject(response);
//         //     }else{
//         //         logger.info('fff');
//         //         const modelUser: UserBaseInterface = user.data;
//         //         modelUser.update(data);

//         //         const response: response = responseStructureSuccess(trans('user.update.success'), modelUser);
//         //         resolve(response);
//         //     }
//         // });
//     };
// }



// export const {getAllUserService, getOneUserService, getAllUserExistService, getOneUserByIdService, storeUserService, updateUserService} = new UserService(); 