import { getOneById, getAll, store }  from './UserService';
import { Request, Response, NextFunction } from 'express';

class UserController{
    public getOneUserById = async (req: Request, res: Response, next: NextFunction) => {
        const user = getOneById({
            'id': req.params.id
        });
    
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

    public getAllUser = async (req: Request, res: Response, next: NextFunction) => {
        const user = getAll({
            'firstName': req.query.firstName || '',
            'lastName': req.query.lastName || '',
            'email': req.query.email || '',
            'userName': req.query.userName || '',
            'gender': parseInt(req.query.gender as string) || ''
        } as getAll);
    
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };

    public storeUser = async (req: Request, res: Response, next: NextFunction) => {
        const user = store({
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'email': req.body.email,
            'userName': req.body.userName,
            'password': req.body.password,
            'gender': req.body.gender
        });
        user.then( (result) => {
            res.status(200);
            res.json(result);
        } ).catch( (err) => {
            res.status(500);
            res.json(err);
        });
    };
}


export const {getOneUserById, getAllUser, storeUser} = new UserController(); 