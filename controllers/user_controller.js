import models from '../models';

const User = models.User;
const Delegation = models.Delegation;
const Request = models.Request;

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
    try {
      if(userRole === 'admin') {
          await User.destroy({
                  where: {id: userId},
                });
          await Request.destroy({
              where: {
                requestor_id: id,
                accepter_id: userId
              }
          })
      } else {
          await Delegation.destroy({
            where: {id: id}
          })
          await Request.destroy({
            where: {
              requestor_id: id,
              accepter_id: userId
            }
        })
      }
      return res.status(200).send({message: 'Delete Success!'});
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },

  deleteLandlord: async (req, res, next) => {
    const landlordId = req.query.id;
    try {
      await User.destroy({where: {sf_landlord_id: landlordId}});
      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

};

export default User_controller;
