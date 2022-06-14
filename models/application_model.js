import { default as common_constants } from '../constants/common_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'application',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      app_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      insurer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_number_of_tenants: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active_lease: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      months_remaining: {
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
      gross_monthly_rent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gross_annual_rent: {
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
      decline_reason_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cancellation_reason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landlord_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lanlord_account_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      apartment_building_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      apartment_building_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      issue_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coverageamountrequested1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coverage_amount_requested_months: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ldr_coverage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      damages_premium: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_coverage_amount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tenant_1_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tenant_1_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tenant_1_fee_input: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tenant_1_portion_fee: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tenant_1_contact_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_units: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      leap_total_inventory: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_active_leap_units: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estimated_app_decline_rate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_units: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sf_createdDate: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      tableName: 'application',
      schema: common_constants.SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
