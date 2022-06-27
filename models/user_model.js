import {SCHEMA_MAPPING} from '../constants/enum_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      job_title: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landlord_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      sf_landlord_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'users',
      schema: SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
