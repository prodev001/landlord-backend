import common_constants from '../constants/common_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'landlord',
    {
      landlord_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primary_contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      billingStreet: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      billingCity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      billingState: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      billingPostalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      billingCountry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number_of_residential_buildings: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      number_of_units: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sf_createdDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recordType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recordTypeId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landlord_primary_contact_email_rpt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_visit_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'landlord',
      schema: common_constants.SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
