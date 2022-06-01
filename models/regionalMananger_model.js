import common_constants from '../constants/common_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'regionalmanager',
    {
      ll_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vp_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      property_ids: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      tableName: 'regionalmanager',
      schema: common_constants.SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
