import Sequelize from 'sequelize';
import { default as common_constants } from '../constants/common_constants';
import userModel from "./user_model";

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'delegation',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      requestor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accepter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requestor_email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accepter_email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      requestor_role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accepter_role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      property: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
      },
      landlord_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'delegation',
      schema: common_constants.SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
