import { Router } from 'express';
import { storeUser, getOneUserById, getAllUser } from '../components/user/UserController';

const router: Router = Router();
router.post('/', storeUser);
router.get('/', getAllUser);
router.get('/:id', getOneUserById);

export default router;