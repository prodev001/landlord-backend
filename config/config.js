import dotenv from 'dotenv';
dotenv.config();

export default {
  "development": {
    "username": "postgress",
    "password": "leapeasy",
    "database": "landlordportal",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "landlordportal",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
}
