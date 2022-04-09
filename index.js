import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import jsforce from "jsforce";
import cors from "cors";
import cron from 'node-cron';

import jobs from './jobs';
import models from './models/index.js';
import routes from './routes';
import user from './routes/user';

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
  res.json({ message: "Welcome to bezkoder application." });
});

models.sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
    // jobs();
    initial();
  });
  // initial();
  // sf_connec();
});

const Role = models.role;
function initial() {
  Role.create({
    id: 1,
    name: "Admin",
  });
 
  Role.create({
    id: 2,
    name: "Landlord",
  });
 
  Role.create({
    id: 3,
    name: "Vice President",
  });
  Role.create({
    id: 4,
    name: "Regional Manager",
  });
  Role.create({
    id: 5,
    name: "Property Manager",
  });
}