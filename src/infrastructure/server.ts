import { app } from './api/express';
import { SERVER_PORT } from './config';
import { initDb } from './database/sequelize';

initDb();

app.listen(SERVER_PORT, () => {
  console.log(`API listening on port ${SERVER_PORT}`);
});
