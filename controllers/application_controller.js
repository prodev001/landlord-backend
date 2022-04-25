import models from '../models';
import fs from 'fs';

const Application = models.application;

const Application_controller = {
  findApplication: (req, res) => {
    const buildingId = req.query.buildingId;
    const landlordId = req.userData.landlordId;
    if(buildingId !== 'undefined') {
      Application.findAll({
        where: {
          apartment_building_id: buildingId, // relace with buildingId
        },
      })
      .then(apps => {
        const data = [];
        apps.forEach(item => {
          data.push(item.dataValues);
        });
        res.status(200).send({
          data: data
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    } else {
      Application.findAll({
        where: {
          landlord_id: landlordId
        },
        // limit: 1000
      })
      .then(apps => {
        const data = [];
        apps.forEach(item => {
          data.push(item.dataValues);
        });
        res.status(200).send({
          data: data
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    }
    
  },

  findUserApplication: (req, res) => {
    const landlordId = req.query.userId;
      Application.findAll({
        where: {
          landlord_id: landlordId
        },
        limit: 1000
      })
      .then(apps => {
        const data = [];
        apps.forEach(item => {
          data.push(item.dataValues);
        });
        res.status(200).send({
          data: data
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  },

  create: (record) => {
    const data = [];
    record.forEach((obj, index) => {
      console.log(obj);
        const landlord_name = obj.Landlord_Account_Lookup__r ? obj.Landlord_Account_Lookup__r.Name : null; 
        const apartment_building_name = obj.Apartment_Building__r ? obj.Apartment_Building__r.Name : null; 
        const tenant_1_name = obj.Tenant_1__r ? obj.Tenant_1__r.Name : null; 
        const leap_total_inventory = obj.Apartment_Building__r ? obj.Apartment_Building__r.Leap_of_Total_Inventory__c : null; 
        const total_units = obj.Apartment_Building__r ? obj.Apartment_Building__r.Total_of_Units__c : null; 
        const total_active_leap_units = obj.Apartment_Building__r ? obj.Apartment_Building__r.Total_of_Active_Leap_Units__c : null; 
        const estimated_app_decline_rate = obj.Apartment_Building__r ? obj.Apartment_Building__r.Estimated_Applicant_Decline_Rate__c : null; 
        data.push({
            app_id: obj.Id,
            name: obj.Name, 
            stage: obj.Stage__c, 
            insurer: obj.Insurer__c, 
            total_number_of_tenants: obj.Total_Number_of_Tenants__c, 
            active_lease: obj.Active_Lease__c, 
            months_remaining: obj.Months_Remaining__c, 
            app_type: obj.Application_Type__c, 
            rider_id: obj.Rider_ID__c, 
            gross_monthly_rent: obj.Gross_Monthly_Rent__c, 
            gross_annual_rent: obj.Gross_Annual_Rent__c, 
            lease_start_date: obj.Lease_Start_Date__c, 
            lease_end_date: obj.Lease_End_Date__c, 
            decline_reason_1: obj.Decline_Reason_1__c, 
            cancellation_reason: obj.Cancellation_Reason__c, 
            landlord_id: obj.Landlord_Account_Lookup__c,
            lanlord_account_name: landlord_name, 
            apartment_building_id: obj.Apartment_Building__c,
            apartment_building_name: apartment_building_name, 
            issue_date: obj.Issue_Date__c, 
            coverageamountrequested1: obj.CoverageAmountRequested1__c, 
            coverage_amount_requested_months: obj.Coverage_Amount_Requested_months__c, 
            ldr_coverage: obj.LDR_Coverage__c, 
            damages_premium: obj.Damages_Premium__c, 
            total_coverage_amount: obj.Total_Coverage_Amount__c, 
            tenant_1_id: obj.Tenant_1__c, 
            tenant_1_name: tenant_1_name, 
            tenant_1_fee_input: obj.Tenant_1_Fee_Input__c, 
            tenant_1_portion_fee: obj.Tenant_1_Portion_of_Fees__c, 
            tenant_1_contact_id: obj.Tenant_1_Contact_ID__c, 
            total_units: total_units, 
            leap_total_inventory: leap_total_inventory, 
            total_active_leap_units: total_active_leap_units, 
            estimated_app_decline_rate: estimated_app_decline_rate,
            sf_createdDate: obj.CreatedDate
        })
    });
    Application.bulkCreate(data).then(() => console.log('Application created successfully'));
  },

  deletePermanently: (where_options) => {
    return Building.destroy({
      where: where_options,
    });
  },
};

export default Application_controller;
