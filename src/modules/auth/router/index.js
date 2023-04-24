import { Router } from 'express';
import { validate } from '../../../common/middlewares';
import AuthController from '../controller';
import AuthValidation from '../validation';

const router = new Router();

router.post('/register', validate(AuthValidation.registerUser), AuthController.registerUser);
router.post('/login', validate(AuthValidation.userLogin), AuthController.userLogin);

export default router;
