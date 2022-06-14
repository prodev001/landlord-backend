import models from '../models';

const User = models.User;
const Delegation = models.Delegation;

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

  deleteUser: async (req, res) => {
    const userRole = req.userData.role;
    const userId = req.query.userId;
    const id = req.query.id;
    console.log(userRole);
    try {
      if(userRole === 'admin') {
          await User.destroy({
                  where: {id: userId},
                });
      } else {
          await Delegation.destroy({
            where: {id: id}
          })
      }
      return res.status(200).send({message: 'Delete Success!'});
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  deleteLandlord: async (req, res, next) => {
    const landlordId = req.query.id;
    try {
      await User.destroy({where: {landlord_id: landlordId}});
      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

};

export default User_controller;
