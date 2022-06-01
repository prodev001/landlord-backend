import common_constants from '../constants/common_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'vicepresident',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      landlordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      property_ids: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      tableName: 'vicepresident',
      schema: common_constants.SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
