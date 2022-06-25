import express, { Router } from 'express';
import { CreateUser } from '../controller/create-user';
const router : Router = express.Router();

router.route("/client").post(new CreateUser().handle.bind(new CreateUser()));

export default router;