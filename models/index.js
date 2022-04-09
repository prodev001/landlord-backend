import Sequelize from 'sequelize';
import configObj from '../config/config.json';
// import fs from 'fs';
import PropertyModel from "./property_model";
import buildingModel from "./building_model";
import landlordModel  from "./landlord_model";
import userModel from "./user_model";
import roleModel from "./role_model";

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

const models = {
  property: PropertyModel(sequelize, Sequelize.DataTypes),
  building: buildingModel(sequelize, Sequelize.DataTypes),
  landlord: landlordModel(sequelize, Sequelize.DataTypes),
  user: userModel(sequelize, Sequelize.DataTypes),
  role: roleModel(sequelize, Sequelize.DataTypes)
};

models.role.belongsToMany(models.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

models.user.belongsToMany(models.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
