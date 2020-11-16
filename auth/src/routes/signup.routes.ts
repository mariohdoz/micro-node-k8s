import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { userValidationResult, validate } from '../middlewares/validator'

const router = Router();

router.post('/api/users/signup', userValidationResult(), validate, authController.postsignUp);

export {router as signUpRouter};