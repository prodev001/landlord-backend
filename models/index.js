import Sequelize from 'sequelize';
import configObj from '../config/config.json';
// import fs from 'fs';
import claimModel from "./claim_model";
import buildingModel from "./building_model";
import landlordModel  from "./landlord_model";
import appModel from "./application_model";
import userModel from "./user_model";
import delegationModel from "./delegation_model";
import vicePresidentModel from './vicepresident_model';
import regionalManangerModel from './regionalMananger_model';
import propertyManagerModel from './propertyManager_model';
import requestModel from './request_model';

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
const VicePresident = vicePresidentModel(sequelize, Sequelize.DataTypes);
const RegionalManager = regionalManangerModel(sequelize, Sequelize.DataTypes);
const PropertyMananger = propertyManagerModel(sequelize, Sequelize.DataTypes);
const Request = requestModel(sequelize, Sequelize.DataTypes);

User.hasMany(VicePresident, {
  as: 'vp_mapping',
  foreignKey: 'landlordId',
});

VicePresident.belongsTo(User, {
    foreignKey: 'landlordId',
});

const models = {
  Claim, 
  Building, 
  Landlord, 
  Application, 
  Delegation, 
  User, 
  VicePresident, 
  RegionalManager, 
  PropertyMananger,
  Request
}

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
