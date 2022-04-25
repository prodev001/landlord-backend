import models from '../models';

const Landlord = models.landlord;

const Landlord_controller = {
  findLandlord: (req, res) => {
    const buildingId = req.query.buildingId;
    Landlord.findAll()
    .then(landlords => {
      const data = [];
      landlords.forEach(ll => {
        data.push(ll.dataValues);
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

  deletePermanently: (where_options) => {
    return Landlord.destroy({
      where: where_options,
    });
  },
};

export default Landlord_controller;
