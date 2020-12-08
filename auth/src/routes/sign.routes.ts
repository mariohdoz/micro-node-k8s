import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { CreateUserValidationResult, LoginUserValidationResult, validate } from '../middlewares/index.middlewares'; 

const router = Router();

router.get('/api/users/signout', authController.postsignOut)

router.post('/api/users/signin', LoginUserValidationResult(), validate, authController.postsignIn);

router.post('/api/users/signup', CreateUserValidationResult(), validate, authController.postsignUp);

export {router as signRouter};