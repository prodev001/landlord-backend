import {SCHEMA_MAPPING} from '../constants/enum_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'notification',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      active_time: {
          type: DataTypes.DATE,
          allowNull: false
      }
    },
    {
      tableName: 'notification',
      schema: SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
