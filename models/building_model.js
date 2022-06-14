import { default as common_constants } from '../constants/common_constants';

export default (sequelize, DataTypes) => {
  return sequelize.define(
    'building',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      building_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      building_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      billingStreet: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      student_housing: {
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
      primary_contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      property_owner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_of_units: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_of_active_leap_units: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      leap_of_total_inventory: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estimated_applicant_decline_rate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      building_approval_rate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_of_issued_policies: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_of_applications: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_of_cancelled_applications: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_of_declined_applications: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_application_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      building_approved_to_issue_rate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cancellation_percentage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_of_decisioned_app: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_of_approved_app: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_of_decisioned_app: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      decline_percentage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      billingState: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sf_createdDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      billingCity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      damageCoverageAmount: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      tableName: 'building',
      schema: common_constants.SCHEMA_MAPPING[process.env.NODE_ENV],
    }
  );
};
