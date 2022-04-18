import { default as common_constants } from '../constants/common_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'users',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landlord_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      landlord_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_role: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      tableName: 'users',
      schema: common_constants.SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
