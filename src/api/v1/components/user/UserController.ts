// import { getOneUserByIdService, getOneUserService, getAllUserService, storeUserService, updateUserService }  from './UserService';
// import { Request, Response } from 'express';

// class UserController{
//     public getOneUserByIdController = async (req: Request, res: Response) => {
//         const user: Promise<response> = getOneUserByIdService(req.params.id);
    
//         user.then( (result) => {
//             res.status(200);
//             res.json(result);
//         } ).catch( (err) => {
//             res.status(500);
//             res.json(err);
//         });
//     };

//     public getOneUserController = async (req: Request, res: Response) => {
//         const data: getOneUser = req.body as getOneUser;
//         const user: Promise<responseList | response> = getOneUserService(data);
    
//         user.then( (result) => {
//             res.status(200);
//             res.json(result);
//         } ).catch( (err) => {
//             res.status(500);
//             res.json(err);
//         });
//     };

//     public getAllUserController = async (req: Request, res: Response) => {
//         const data: getAllUser = req.body as getAllUser;
//         const user: Promise<responseList | response> = getAllUserService(data, parseInt(req.params.page), parseInt(req.params.limit));
    
//         user.then( (result) => {
//             res.status(200);
//             res.json(result);
//         } ).catch( (err) => {
//             res.status(500);
//             res.json(err);
//         });
//     };

//     public storeUserController = async (req: Request, res: Response) => {
//         const data: storeUser = req.body as storeUser;
//         const user: Promise<response> = storeUserService(data);

//         user.then( (result) => {
//             res.status(200);
//             res.json(result);
//         } ).catch( (err) => {
//             res.status(500);
//             res.json(err);
//         });
//     };

//     public updateUserController = async (req: Request, res: Response) => {
//         const data: updateUser = req.body as updateUser;
//         const user: Promise<response> = updateUserService(req.params.id, data);
        
//         user.then( (result) => {
//             res.status(200);
//             res.json(result);
//         } ).catch( (err) => {
//             res.status(500);
//             res.json(err);
//         });
//     };

// }


// export const {getOneUserByIdController, getOneUserController, getAllUserController, storeUserController, updateUserController} = new UserController(); 