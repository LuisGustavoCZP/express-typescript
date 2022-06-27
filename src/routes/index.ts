import express, { Express } from 'express';
import ping from "./ping";
import account from "./account";
import user from "./user";

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/ping", ping);
app.use("/user", user);
app.use("/account", account);

export default app;