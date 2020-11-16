import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.get('/api/users/currentuser', authController.getCurrentUser);

export {router as currentUserRouter};