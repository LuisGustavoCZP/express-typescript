import express, { Router } from 'express';
import { TransactionController } from '../controller';

const router : Router = express.Router();

router.route("/transference").post(TransactionController.CreateTransference.handle);
router.route("/extract").post(TransactionController.CreateExtract.handle);
router.route("/deposit").post(TransactionController.CreateDeposit.handle);
router.route("/withdraw").post(TransactionController.CreateWithdraw.handle);

export default router;