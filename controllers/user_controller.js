import models from '../models';

const User = models.User;

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

  deleteUser: (req, res, next) => {
    const { emails } = req.body;
    User.destroy({
      where: {email: emails},
    }).then(count => {
       
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  },
};

export default User_controller;
