import { Router } from 'express';
import { getOneByIdController, getOneController, getAllController, storeController, updateController } from '../components/user/UserController';

const router: Router = Router();
router.post('/store', storeController);
router.put('/update/:id', updateController);
router.get('/', getOneController);
router.get('/all', getAllController);
router.get('/:id', getOneByIdController);

export default router;