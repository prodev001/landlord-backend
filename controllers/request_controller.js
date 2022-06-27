import Sequelize from 'sequelize';
var Op = Sequelize.Op;

import models from '../models';
import {REQUEST_STATUS} from '../constants/enum_constants';


const Request = models.Request;
const Delegation = models.Delegation;
const Building = models.Building;
const Notification = models.Notification;

const Request_controller = {

  RequestCreate: async (req, res) => {
    const userData = req.userData;
    const {property, accepter} = req.body;
    const requestor_id = userData.userId;
    const accepter_id = accepter.accepterId || null;
    const requestor_email = userData.email;
    const accepter_email = accepter.email;
    const requestor_role = userData.role;
    const accepter_role = accepter.role;
    const landlord_id = accepter.landlordId;
    const request_type = 'request';
    const request_status = REQUEST_STATUS['PENDING'];
    try {
        const data = {
            request_type,
            request_status,
            requestor_id,
            accepter_id,
            requestor_email,
            accepter_email,
            requestor_role,
            accepter_role,
            property,
            landlord_id
        };
        const request = await Request.findOne({where: {requestor_email, accepter_email}})
        if(request) {
          return res.status(500).send({
            message: 'Request already Exist'
          })
        }
        await Request.create(data);
        // sendEmail(res, data, emailSubject, emailContent );
        res.status(200).send({
          message: 'Request Success!'
        });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  findEmail: async (req, res) => {
    const userRole = req.userData.role;
    const userEmail = req.userData.email;
    try {
      let requests;
      if(userRole === 'admin') {
        requests = await Request.findAll();
      } else {
        requests = await Request.findAll({
          where: {
            requestor_email: userEmail,
            requestor_role: userRole,
          }
        })
      }
      res.status(200).send({
        data: requests,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  findRequestTo: async (req, res) => {
    const userRole = req.userData.role;
    const userEmail = req.userData.email;
    try {
      const requests = await Request.findAll({
        where: {
          requestor_email: userEmail,
          requestor_role: userRole,
        }
      })
      res.status(200).send({
        data: requests,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  findRequestFrom: async (req, res) => {
    const userRole = req.userData.role;
    const userEmail = req.userData.email;
    try {
      const requests = await Request.findAll({
        where: {
          accepter_email: userEmail,
          accepter_role: userRole,
        }
      })
      res.status(200).send({
        data: requests,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  acceptRequest: async (req, res, next) => {
    const id = req.query.id;
    console.log(id);
    try {
      const request = await Request.findOne(
        {where: { id: id}},
      )
      request.set({request_status: REQUEST_STATUS['ACCEPT']});
      request.save();
      console.log(request);
      const delegation = await Delegation.findOne({
        where: {
          requestor_email: request.accepter_email,
          accepter_email: request.requestor_email,
        }
      })
      if(delegation) {
        delegation.set({
          property: delegation.property.concat(request.property)
        })
        delegation.save();
      } 
      else {
        await Delegation.create({
          accepter_email: request.requestor_email,
          accepter_role: request.requestor_role,
          requestor_email: request.accepter_email,
          requestor_role: request.accepter_role,
          property: request.property,
          accepter_id: request.requestor_id,
          requestor_id: request.accepter_id,
          landlord_id: request.landlord_id
        })
      }
      
      next();
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  },

  declineRequest: async (req, res, next) => {
    const {id, text} = req.body;
    try {
      await Request.update(
        {
          request_status: REQUEST_STATUS['DECLINE'],
          decline_reason: text
        },
        {where: {id: id}}
      )
      next();
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  },

  destroyById: async (req, res, next) => {
    const id = req.query.id;
    try {
      await Request.destroy({
        where: {
          id: id
        }
      });
      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  setUserActivity: async (req, res) => {
    try {
      const userId = req.userData.userId;
      const old_notification = await Notification.findOne({where: {user_id: userId}});
      if (old_notification) {
        await Notification.update({
          active_time: Date.now()
        },
        {
          where: {user_id: userId}
        })
      } else {
        await Notification.create({user_id: userId, active_time: Date.now()})
      }
      const new_notification = await Notification.findOne({where: {user_id: userId}});
      res.status(200).send(new_notification);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  
  getNotification: async (req, res) => {
    try {
      const userId = req.userData.userId;
      const notification = await Notification.findAll({where: {}})
    } catch (error) {
      
    }
  }
};

export default Request_controller;
