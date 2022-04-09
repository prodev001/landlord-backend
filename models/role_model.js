import { default as common_constants } from '../constants/common_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'roles',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      tableName: 'roles',
      schema: common_constants.SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
