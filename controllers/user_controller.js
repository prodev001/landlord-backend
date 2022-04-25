import models from '../models';

const User = models.user;

const User_controller = {
    
  findLandlord: (id) => {
    return Landlord.find({
      where: {
        id: id,
      },
    });
  },

  create: (record) => {
    const data = [];
    record.forEach(obj => {
      data.push({
          landlord_id: obj.Id,
          landlord_name: obj.Name,
          email: obj.Email_Address__c,
          sf_createdDate: obj.CreatedDate,
          user_role: 'Landlord'
      })
    });

    User.bulkCreate(data).then(() => console.log('User created successfully'));
  },

  deletePermanently: (where_options) => {
    return User.destroy({
      where: where_options,
    });
  },
};

export default User_controller;
