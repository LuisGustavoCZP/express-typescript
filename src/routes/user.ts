import express, { Router } from 'express';
import { CreateUser } from '../controller';
const router : Router = express.Router();

router.route("/create").post(CreateUser.handle);

export default router;