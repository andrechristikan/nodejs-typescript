import { Router } from 'express';

const router: Router = Router();
router.get('/', (req, res) => {
    const response = responseStructure.error(trans('app.page.notFound'));
    res.status(200).json(response);
});

export default router;