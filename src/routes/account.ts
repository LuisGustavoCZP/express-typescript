import express, { Router } from 'express';
import { AccountController } from '../controller';

const router : Router = express.Router();

router.route("/create").post(AccountController.CreateAccount.handle)

export default router;