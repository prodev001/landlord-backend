import { default as common_constants } from '../constants/common_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'delegation',
    {
      requestor_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      accepter_id: {
        type: DataTypes.STRING,
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
