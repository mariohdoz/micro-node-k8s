import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.get('/api/users/signout', authController.postsignOut);

export {router as signOutRouter};