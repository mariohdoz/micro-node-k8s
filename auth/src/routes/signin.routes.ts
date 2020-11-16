import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.get('/api/users/signin', authController.postsignIn);

export {router as signInRouter};