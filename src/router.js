import { Router } from 'express';
import AuthRouter from './modules/auth/router';
import UsersRouter from './modules/users/router';

const router = new Router();

router.use('/', AuthRouter);
router.use('/users', UsersRouter);

export default router;
