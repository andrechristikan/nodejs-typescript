import v1 from './v1/routes';

const routers: any = {
    v1
};
const router = routers[`v${env('VERSION')}`];

export default router;