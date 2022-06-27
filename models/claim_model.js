import {SCHEMA_MAPPING} from '../constants/enum_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'claim',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      claim_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      app_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      apartment_building_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tenant1_lease: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tenant2_lease: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tenant3_lease: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tenant4_lease: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      monthly_rent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_indemnity_payments: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      apartment_building_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lease_start_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lease_end_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      account_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_months_remaining: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_insurable_value: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_active_lease: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_coverage_amount_requested_months: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_ldr_coverage_c: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_total_number_of_tenants: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_gross_annual_rent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_damage_coverage_amount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_total_rent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rider_total_coverage_amount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landlord_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landlord_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bond_issue_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'claim',
      schema: SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
