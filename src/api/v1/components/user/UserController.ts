import { getOneByIdService, getOneService, getAllService, storeService, updateService }  from './UserService';
import { Request, Response } from 'express';

class UserController{
    public getOneByIdController = async (req: Request, res: Response) => {
        const user: Promise<response> = getOneByIdService(req.params.id);
    
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

    public getOneController = async (req: Request, res: Response) => {
        const data = req.query as getOneUser;
        const user: Promise<responseList | response> = getOneService(data);
    
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

    public getAllController = async (req: Request, res: Response) => {
        const data = req.query as getAllUser;
        const user: Promise<responseList | response> = getAllService(data);
    
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

    public storeController = async (req: Request, res: Response) => {
        const data: storeUser = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'email': req.body.email,
            'userName': req.body.userName,
            'password': req.body.password,
            'gender': req.body.gender
        };
        const user: Promise<response> = storeService(data);

        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

    public updateController = async (req: Request, res: Response) => {
        const data = req.body as updateUser;
        const user: Promise<response> = updateService(req.params.id, data);
        
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

}


export const {getOneByIdController, getOneController, getAllController, storeController, updateController} = new UserController(); 