import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
// import { userValidationResult, validate } from '../middlewares/validator';
import { userValidationResult, validate } from '../middlewares/index.middlewares'; 

const router = Router();

router.get('/api/users/signout', authController.postsignOut)

router.get('/api/users/signin', authController.postsignIn);

router.post('/api/users/signup', userValidationResult(), validate, authController.postsignUp);

export {router as signRouter};