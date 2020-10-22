import 'dotenv/config';
import App from './app';
import APIController from './api/api.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new APIController(),
  ],
);

app.listen();
