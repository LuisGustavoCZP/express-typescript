import express, { Router } from 'express';
import { UserController } from '../controller';
const router : Router = express.Router();

router.route("/create").post(UserController.CreateUser.handle);

export default router;