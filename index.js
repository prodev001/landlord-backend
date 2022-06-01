import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import bcrypt from 'bcryptjs';
const { hashSync, compareSync } = bcrypt;
import queue_listener from './listener/queue_listener';
import jobs from './jobs';
import models from './models/index.js';
import routes from './routes';

import webpush from 'web-push';

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

const port = process.env.PORT || 8000;
const app = express();
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger('common'));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.static('public'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

const router = express.Router();
app.use('/api', routes(router));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to node application." });
});

// models.sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
  // queue_listener.process_messages();
    // jobs();
    // initial();
  });
// });

// const initial = () => {
//   models.User.create({
//     username: 'LeapEasy',
//     email: 'admin@leapeasy.com',
//     password: hashSync('admin', 8),
//     role: 'admin'
//   })
// }