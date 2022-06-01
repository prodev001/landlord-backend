import models from '../models';
import Sequelize from 'sequelize';
var Op = Sequelize.Op;

import {sendEmail} from '../util/util';

const Delegation = models.Delegation;
const Request = models.Request;
const Building = models.Building;

const Delegation_controller = {

  findPropertyMananger: async (req, res) => {
    const userRole = req.userData.role;
    const userEmail = req.userData.email;
    const role = req.params.role;
    try {
      let delegates;
      if(userRole === 'admin') {
        delegates = await Delegation.findAll({
          where: {
            accepter_role: role
          }
        });
      } else {
        delegates = await Delegation.findAll({
          where: {
            requestor_email: userEmail,
            requestor_role: userRole,
            accepter_role: role
          }
        });
      }
      res.status(200).send({
        data: delegates
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
   
  },
  
  findInviteBuilding: async (req, res) => {
    const landlordId = req.userData.landlordId;
    const userRole = req.userData.role;
    const userEmail = req.userData.email;
    const userId = req.userData.userId;
    const property = req.userData.property;
    let buildings, delegates;
    try {
      if(userRole === 'll') {
        buildings = await Building.findAll({
          where: {
            landlord_id: landlordId,
          },
          // offset: 100, limit: 10
        })
        delegates = await  Delegation.findAll({
            where: {
              requestor_email: userEmail,
              requestor_role: userRole
            }
          })
        if(delegates.length > 0) {
            delegates.forEach(delegate => {
              buildings = buildings.filter(building => !delegate.property.includes(building.building_id));
            })
        }
      } else if (userRole === 'vp' || userRole === 'rm' || userRole === 'pm') {
        delegates = await Delegation.findAll({
            where: {
              requestor_email: userEmail,
              requestor_role: userRole
            }
          })
          let buildingIds = property;
          if(delegates.length > 0) {
            delegates.forEach(delegate => {
              buildingIds = buildingIds.filter(id => !delegate.property.includes(id));
            })
          }
          buildings = await Building.findAll({
              where: {
                building_id: { [Op.in]: buildingIds } 
              }
            })
      } else {
        buildings = await Building.findAll({limit: 2000});
      }
      res.status(200).send({
        data: buildings
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  findRequestUserProperty: async (req, res) => {
    const data = req.body;
    let buildings, delegates, requests;
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
                requestor_email: data.accepter_email,
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
                accepter_email: data.accepter_email,
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
      const delegates = await Delegation.findAll({
        where: {
          accepter_role: 'vp',
          // accpeted: true
        }
      })
      res.status(200).send({
        data: delegates,
      });
    } catch (error) {
      res.status(500).send({ message: err.message });
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

  deleteUser: (req, res, next) => {
    const { ids } = req.body;
    Delegation.destroy({
      where: {id: ids},
    }).then(count => {
      if (!count) {
        return res.status(404).send({error: 'No user'});
       }
       next();
       return res.status(200).send({message: 'Delete Success!'});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
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
