import models from '../models';
import {sendLandlordInviteEmail} from '../util/util';

const Landlord = models.Landlord;

const Landlord_controller = {

  findInviteLandlord: async (req, res) => {
    try {
      const landlords = await Landlord.findAll({where: {active: false}});
      res.status(200).send({
        data: landlords
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  findActiveLandlord: async (req, res) => {
    try {
      const landlords = await Landlord.findAll({where: {active: true}});
      res.status(200).send({
        data: landlords
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  create: (record) => {
    const data = [];
    record.forEach(obj => {
      const primary_contact = obj.Primary_Contact__r ? obj.Primary_Contact__r.Name : null;
      data.push({
          landlord_id: obj.Id,
          name: obj.Name,
          phone: obj.Phone,
          primary_contact: primary_contact,
          billingStreet: obj.BillingStreet,
          billingCity: obj.BillingCity,
          billingState: obj.BillingState,
          billingPostalCode: obj.BillingPostalCode,
          billingCountry: obj.BillingCountry,
          email_address: obj.Email_Address__c,
          number_of_resident_buildings: obj.Number_of_Residential_Buildings__c,
          number_of_units: obj.Number_of_Units__c,
          sf_createdDate: obj.CreatedDate,
          recordType:  obj.RecordType.Name,
          recordTypeId: obj.RecordTypeId,
          parentId: obj.ParentId,
          landlord_primary_contact_email_rpt: obj.Landlord_Primary_Contact_Email_RPT__c,
          last_visit_date: obj.Last_Visit_Date__c
      })
    });

    Landlord.bulkCreate(data).then(() => console.log('Landlord created successfully'));
  },

  deleteLandlord: (req, res) => {
    Landlord.destroy({
      where: {landlord_id: req.body},
    }).then(count => {
      if (!count) {
        return res.status(404).send({error: 'No user'});
       }
       Landlord.findAll()
      .then(landlords => {
          const data = [];
          landlords.forEach(ll => {
            data.push(ll.dataValues);
          });
          res.status(200).send({
            message: 'User Deleted Successfully',
            data: data
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  },

  sendInviteEmail: async (req, res) => {
    const payload = req.body;
    const {toEmail, emailContent, emailSubject, landlordID} = payload;
    console.log(toEmail, emailContent, emailSubject,landlordID);
      for (let index = 0; index < toEmail.length; index++) {
        const data = {
          toEmail: toEmail[index],
          emailSubject,
          emailContent,
          landlordId: landlordID[index]
        }
        console.log(data);
        await sendLandlordInviteEmail(res, data);
      }
  },

  inactiveLandlord: async (req, res, next) => {
    const landlordId = req.query.id;
    try {
      await Landlord.update({
        active: false
      },
      {
        where: {landlord_id: landlordId}
      });
      next();
      // res.status(200).send({message: 'Inactivate Landlord success!'})
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
};

export default Landlord_controller;
