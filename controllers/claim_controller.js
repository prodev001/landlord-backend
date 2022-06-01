import models from '../models';
import Sequelize from 'sequelize';
var Op = Sequelize.Op;

const Claim = models.Claim;

const Claim_controller = {
  findClaim: async (req, res) => {
    const buildingId = req.query.buildingId;
    const userRole = req.userData.role;
    const landlordId = req.userData.landlordId;
    const property = req.userData.property;
    let claims;
    try {
      if(buildingId !== 'undefined') {
        claims = await Claim.findAll({
          where: {
            apartment_building_id: buildingId, // relace with buildingId
          },
        })
      } else {
        if(userRole === 'admin') {
          claims = await Claim.findAll();
        } else if (userRole === 'll') {
          claims = await  Claim.findAll({
            where: {
              landlord_id: landlordId
            }
          });
        } else {
            claims = await  Claim.findAll({
              where: {
                apartment_building_id: { [Op.in]: property } 
              }
            });
        }
      }      
      res.status(200).send({
        data: claims
      });
    } catch (error) {
      res.status(500).send({ message: err.message });
    }

  },

  findUserClaim: async (req, res) => {
    const buildingId = req.query.buildingId;
    const landlordId = req.query.landlordId;
    let claims;
    try {
      if(!landlordId) {
        claims = await Claim.findAll({
          where: {
            apartment_building_id: buildingId
          },
        })
      } else {
        claims = await Claim.findAll({
          where: {
            landlord_id: landlordId
          },
        })
      }
      res.status(200).send({
        data: claims
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  create: (record) => {
    const data = [];
    record.forEach((obj, index) => {
        const rider_months_remaining = obj.Rider__r ? obj.Rider__r.Months_Remaining__c : null;
        const rider_insurable_value = obj.Rider__r ? obj.Rider__r.Insurable_Value__c : null;
        const rider_active_lease = obj.Rider__r ? obj.Rider__r.Active_Lease__c : null;
        const rider_coverage_amount_requested_months = obj.Rider__r ? obj.Rider__r.Coverage_Amount_Requested_months__c : null;
        const rider_ldr_coverage_c = obj.Rider__r ? obj.Rider__r.LDR_Coverage__c : null;
        const rider_total_number_of_tenants = obj.Rider__r ? obj.Rider__r.Total_Number_of_Tenants__c : null;
        const rider_gross_annual_rent = obj.Rider__r ? obj.Rider__r.Gross_Annual_Rent__c : null;
        const rider_damage_coverage_amount = obj.Rider__r ? obj.Rider__r.Damage_Coverage_Amount__c : null;
        const rider_total_rent = obj.Rider__r ? obj.Rider__r.Total_Rent__c : null;
        const rider_total_coverage_amount = obj.Rider__r ? obj.Rider__r.Total_Coverage_Amount__c : null;
        const landlord_name = obj.Landlord__r ? obj.Landlord__r.Name : null;
        data.push({
            claim_status: obj.Claim_Status_Description__c,
            app_type: obj.Application_Type__c,
            rider_id: obj.Rider_ID__c,
            apartment_building_id: obj.Apartment_Building__c,
            tenant1_lease: obj.Tenant1_on_Lease__c,
            tenant2_lease: obj.Tenant2_on_Lease__c,
            tenant3_lease: obj.Tenant3_on_Lease__c,
            tenant4_lease: obj.Tenant4_on_Lease__c,
            monthly_rent: obj.Monthly_Rent__c,
            total_indemnity_payments: obj.Total_Indemnity_Payments__c,
            apartment_building_address: obj.Apartment_Building_Address__c,
            lease_start_date: obj.Lease_Start_Date__c,
            lease_end_date: obj.Lease_End_Date__c,
            account_name: obj.Account_Name__c,
            rider_months_remaining: rider_months_remaining,
            rider_insurable_value: rider_insurable_value,
            rider_active_lease: rider_active_lease,
            rider_coverage_amount_requested_months: rider_coverage_amount_requested_months,
            rider_ldr_coverage_c: rider_ldr_coverage_c,
            rider_total_number_of_tenants: rider_total_number_of_tenants,
            rider_gross_annual_rent: rider_gross_annual_rent,
            rider_damage_coverage_amount: rider_damage_coverage_amount,
            rider_total_rent: rider_total_rent,
            rider_total_coverage_amount: rider_total_coverage_amount,
            landlord_id: obj.Landlord__c,
            landlord_name: landlord_name,
            bond_issue_date: obj.Bond_Issue_Date__c
        })
    });
    Claim.bulkCreate(data).then(() => console.log('Claim created successfully'));
  },

  deletePermanently: (where_options) => {
    return Building.destroy({
      where: where_options,
    });
  },
};

export default Claim_controller;
