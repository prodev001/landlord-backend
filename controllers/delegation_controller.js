import models from '../models';
import Sequelize from 'sequelize';
var Op = Sequelize.Op;

const Delegation = models.Delegation;
const Request = models.Request;
const Building = models.Building;
const User = models.User;

const Delegation_controller = {

  findPropertyMananger: async (req, res) => {
    const userRole = req.userData.role;
    const userEmail = req.userData.email;
    const userId = req.userData.userId;
    const role = req.params.role;
    try {
      let delegates;
      if(userRole === 'admin') {
        delegates = await Delegation.findAll({
          where: {
            accepter_role: role
          },
          include: [
            {
              model: User, 
              as: 'accepter', 
              attributes: ['image', 'username', 'phone', 'job_title', 'role', 'email']
            },
            {
              model: User, 
              as: 'requestor', 
              attributes: ['image', 'username', 'phone', 'job_title', 'role', 'email']
            }
          ]
        });
      } else {
        delegates = await Delegation.findAll({
          where: {
            requestor_id: userId,
            accepter_role: role,
          },
          include: [
            {
              model: User, 
              as: 'accepter', 
              attributes: ['image', 'username', 'phone', 'job_title']
            },
            {
              model: User, 
              as: 'requestor', 
              attributes: ['image', 'username', 'phone', 'job_title']
            }
          ]
        });
      }
      console.log(delegates);
      res.status(200).send({
        data: delegates
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
   
  },

  findRequestUserProperty: async (req, res) => {
    const data = req.body;
    let buildings, delegates, requests;
    console.log(data);
    try {
      const accepter_role = data.accepter_role;
      if(!accepter_role) {
          buildings = await Building.findAll({
            where: {
              landlord_id: data.landlord_id,
            },
          })

          delegates = await  Delegation.findAll({
              where: {
                requestor_email: data.email_address,
                requestor_role: 'll'
              }
            })
          if(delegates.length > 0) {
              delegates.forEach(delegate => {
                buildings = buildings.filter(building => !delegate.property.includes(building.building_id));
              })
          }
          requests = await  Request.findAll({
            where: {
                landlord_id: data.landlord_id,
              }
            })
          if(requests.length > 0) {
            requests.forEach(request => {
                buildings = buildings.filter(building => !request.property.includes(building.building_id));
              })
          }
        } else {
          let property = data.property;
          delegates = await Delegation.findAll({
              where: {
                requestor_id: data.accepter_id,
                requestor_role: accepter_role
              }
            })
          if(delegates.length > 0) {
            delegates.forEach(delegate => {
                property = property.filter(id => !delegate.property.includes(id));
              })
          }
          requests = await  Request.findAll({
            where: {
                requestor_id: data.accepter_id,
                accepter_role: accepter_role
              }
            })
          if(requests.length > 0) {
            requests.forEach(request => {
                property = property.filter(id => !request.property.includes(id));
              })
          }
          buildings = await Building.findAll({
              where: {
                building_id: { [Op.in]: property } 
              }
            })
      }
      res.status(200).send({
        data: buildings
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },

  findVP: async (req, res) => {
    try {
      const userId = req.userData.userId;
      const requestorIds = await Delegation.findAll(
        {
          where: {
            requestor_role: 'vp',
            accepter_id: userId
          },
          attributes: ['requestor_id']
        })
      console.log(requestorIds);
      const ids = [];
      requestorIds.forEach(item => ids.push(item.requestor_id))
      const vps = await Delegation.findAll(
        {
          where: { accepter_id: { [Op.in]: ids } },
          include: {
              model: User, 
              as: 'accepter', 
              attributes: ['image', 'username', 'phone', 'job_title', 'role']
          }
        },
      )
      res.status(200).send({
        data: vps,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  updateProperty: (req, res) => {
    const {property, id } = req.body;
    Delegation.update(
      {property: property},
      {where: {id: id}}
    ).then(count => {
      if (!count) {
        return res.status(404).send({error: 'No user'});
       }
       return res.status(200).send({message: 'Update Success!'});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  },

  deleteLandlord: async (req, res, next) => {
    const landlordId = req.query.id;
    try {
      await Delegation.destroy({where: {landlord_id: landlordId}});
      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  findInvites: async (req, res) => {
    const userRole = req.userData.role;
    const userEmail = req.userData.email;

    try {
      const invites = await Delegation.findAll({
        where: {
          requestor_email: userEmail,
          requestor_role: userRole
        }
      })
      res.status(200).send({
        data: invites,
      });
    } catch (error) {
      res.status(500).send({ message: err.message });
    }
  },

  destroyById: async (req, res) => {
    const id = req.query.id;
    try {
      await Delegation.destroy({
        where: {
          id: id
        }
      });
      res.status(200).send({ message: 'Delete Invite Success'})
    } catch (error) {
      res.status(500).send({ message: err.message });
    }
  }
}

export default Delegation_controller;
