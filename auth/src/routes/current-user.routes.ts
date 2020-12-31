import { Router } from 'express';
import { userController } from "../controllers/index.controllers";
import { currentUser } from "@hdozdev/common";

const router = Router();

router.get('/api/users/currentuser', currentUser, userController.getCurrentUser);

export {router as currentUserRouter};