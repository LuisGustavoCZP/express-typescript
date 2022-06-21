import express, { Router } from 'express';
import controller from '../../controller';
const router : Router = express.Router();

router.get("/", controller.ping);
router.get("/2", controller.ping2);

export default router;