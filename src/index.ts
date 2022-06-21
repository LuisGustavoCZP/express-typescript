import express, { Express } from 'express';
import dotenv from 'dotenv';
import ping from './routes/ping'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use("/ping", ping);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});