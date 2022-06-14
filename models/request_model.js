import { default as common_constants } from '../constants/common_constants';

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
      accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      declined: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      property: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
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
      schema: common_constants.SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
