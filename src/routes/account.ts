import express, { Router } from 'express';
import CreateAccount from '../controller/account/create-account';

const router : Router = express.Router();

router.route("/").post(CreateAccount.handle)

export default router;