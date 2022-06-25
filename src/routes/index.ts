import express, { Router, Express } from 'express';
import ping from "./ping";

const app: Express = express();

app.use("/ping", ping);

export default app;