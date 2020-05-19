import { Router } from 'express';
import { getOneUserById, getOneUser, getAllUser, storeUser, updateUser } from '../components/user/UserController';

const router: Router = Router();
router.post('/store', storeUser);
router.put('/update/:id', updateUser);
router.get('/', getOneUser);
router.get('/all', getAllUser);
router.get('/:id', getOneUserById);

export default router;