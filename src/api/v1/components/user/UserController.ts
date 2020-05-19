import { getOneById, getOne, getAll, store, update }  from './UserService';
import { Request, Response } from 'express';

class UserController{
    public getOneUserById = async (req: Request, res: Response) => {
        const user: Promise<response> = getOneById(req.params.id);
    
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

    public getOneUser = async (req: Request, res: Response) => {
        const data = req.query as getOneUser;
        const user: Promise<responseList | response> = getOne(data);
    
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

    public getAllUser = async (req: Request, res: Response) => {
        const data = req.query as getAllUser;
        const user: Promise<responseList | response> = getAll(data);
    
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

    public storeUser = async (req: Request, res: Response) => {
        const data: storeUser = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'email': req.body.email,
            'userName': req.body.userName,
            'password': req.body.password,
            'gender': req.body.gender
        };
        const user: Promise<response> = store(data);

        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

    public updateUser = async (req: Request, res: Response) => {
        const data = req.body as updateUser;
        const user: Promise<response> = update(req.params.id, data);
        
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

}


export const {getOneUserById, getOneUser, getAllUser, storeUser, updateUser} = new UserController(); 