import enum_constants from '../constants/enum_constants';
import common_constants from '../constants/common_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'property',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      propertyid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      property_response: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      landlord: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      process_message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'property',
      schema: common_constants.SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
