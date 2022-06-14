import Sequelize from 'sequelize';
import configObj from '../config/config';
// import fs from 'fs';
import claimModel from "./claim_model";
import buildingModel from "./building_model";
import landlordModel  from "./landlord_model";
import appModel from "./application_model";
import userModel from "./user_model";
import delegationModel from "./delegation_model";
import requestModel from './request_model';
import notificationModel from './notification_model';

const env = process.env.NODE_ENV || 'development';
const config = configObj[env];

let sequelize;
if (env === 'development') {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 120000,
      idle: 30000,
    },
    define: {
      underscored: true,
      schema: config.schema,
    },
  }); 
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    pool: config.pool,
    define: config.define,
    dialect: config.dialect,
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 120000,
      idle: 30000,
    },
    // dialectOptions: {
    //   ssl: {
    //     rejectUnauthorized: true,
    //     ca: [rdsCa],
    //   },
    // },
  });
}

const Claim = claimModel(sequelize, Sequelize.DataTypes);
const Building = buildingModel(sequelize, Sequelize.DataTypes);
const Landlord = landlordModel(sequelize, Sequelize.DataTypes);
const Application = appModel(sequelize, Sequelize.DataTypes);
const Delegation = delegationModel(sequelize, Sequelize.DataTypes);
const User = userModel(sequelize, Sequelize.DataTypes);
const Request = requestModel(sequelize, Sequelize.DataTypes);
const Notification = notificationModel(sequelize, Sequelize.DataTypes);

User.hasMany(Delegation, {as: 'delegation'});

Delegation.belongsTo(User, {
  foreignKey: 'accepter_id',
  onDelete: 'CASCADE',
  as: 'accepter'
});

Delegation.belongsTo(User, {
  foreignKey: 'requestor_id',
  onDelete: 'CASCADE',
  as: 'requestor'
});

const models = {
  Claim, 
  Building, 
  Landlord, 
  Application, 
  Delegation, 
  User, 
  Request,
  Notification
}

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
