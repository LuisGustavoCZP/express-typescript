import express, { Express } from 'express';
import ping from "./ping";
import account from "./account";
import transaction from './transaction';

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/ping", ping);
//app.use("/user", user);
app.use("/account", account);
//app.use("/transaction")
app.use(transaction)
export default app;