import models from '../models';
import fs from 'fs';

const Building = models.building;

const Building_repository = {
  findBuilding: (req, res) => {
    Building.findAll({
      where: {
        landlord_id: '0018W00001bUKAqQAO',
      },
      // offset: 100, limit: 10
    })
    .then(buildings => {
      const data = [];
      buildings.forEach(item => {
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
        const landlord_name = obj.Landlord__r ? obj.Landlord__r.Name : null; 
        const primary_contact = obj.Primary_Contact__r ? obj.Primary_Contact__r.Email : null;
        data.push({
            building_id: obj.Id,
            name: obj.Name,
            building_type: obj.Building_Type__c,
            phone: obj.Phone,
            billingStreet: obj.BillingStreet,
            email_address: obj.Email_Address__c,
            student_housing: obj.Student_Housing__c,
            landlord_id: obj.Landlord__c,
            landlord_name: landlord_name,
            primary_contact: primary_contact,
            property_owner: obj.Property_Owner__c,
            total_of_units: obj.Total_of_Units__c,
            total_of_active_leap_units: obj.Total_of_Active_Leap_Units__c,
            leap_of_total_inventory: obj.Leap_of_Total_Inventory__c,
            estimated_applicant_decline_rate: obj.Estimated_Applicant_Decline_Rate__c,
            building_approval_rate: obj.Building_Approval_Rate__c,
            total_of_issued_policies: obj.Total_of_Issued_Policies__c,
            total_of_applications: obj.Total_of_Applications__c,
            total_of_cancelled_applications: obj.Total_of_Cancelled_Applications__c,
            total_of_declined_applications: obj.Total_of_Declined_Applications__c,
            last_application_date: obj.Last_Application_Date__c,
            building_approved_to_issue_rate: obj.Building_Approved_to_Issue_Rate__c,
            cancellation_percentage: obj.Cancellation_Percentage__c,
            total_of_decisioned_app: obj.Total_of_Decisioned_Applications__c,
            total_of_approved_app: obj.Total_of_Approved_Applications__c,
            decline_percentage: obj.Decline_Percentage__c,
            billingState: obj.BillingState,
            sf_createdDate: obj.CreatedDate,
            billingCity: obj.BillingCity
        })
    });
    Building.bulkCreate(data).then(() => console.log('Building created successfully'));
  },

  deletePermanently: (where_options) => {
    return Building.destroy({
      where: where_options,
    });
  },
};

export default Building_repository;
