import {SCHEMA_MAPPING} from '../constants/enum_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'request',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      requestor_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      request_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      request_status: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      accepter_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
          allowNull: true,
      },
      landlord_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      decline_reason: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email_text: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: 'request',
      schema: SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
