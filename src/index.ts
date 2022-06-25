import { config } from './config';
import app from './routes';

app.listen(config.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.PORT}`);
});