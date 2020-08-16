import { Request, Response, NextFunction } from 'express';
import { getById as userGetByIdService } from './UserService';
import { UserBaseInterface } from './UserInterface';

class UserController {
    public async profile(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        userGetByIdService(req.user)
            .then((user: UserBaseInterface) => {
                const response = new APIResponse(
                    Enum.HttpSuccessStatusCode.OK,
                    language('user.profileSuccess'),
                    user
                );
                res.status(response.code).json(response);
            })
            .catch((err) => {
                next(new APIError(Enum.SystemErrorCode.GENERAL_ERROR));
            });
    }
}

export default UserController;
