import models from '../models';
import Sequelize from 'sequelize';
var Op = Sequelize.Op;

import {sendEmail} from '../util/util';

const Request = models.Request;
const Delegation = models.Delegation;
const Building = models.Building;

const Request_controller = {

  InviteCreate: async (req, res) => {
    const userData = req.userData;
    const payload = req.body;
    const requestor_id = userData.userId;
    const accepter_id = payload.accepterId || null;
    const requestor_email = userData.email;
    const accepter_email = payload.toEmail;
    const requestor_role = userData.role;
    const accepter_role = payload.userRole;
    const property = payload.property;
    const landlord_id = userData.landlordId;
    const emailSubject = payload.emailSubject;
    const emailContent = payload.emailContent;
    const request_type = 'invite';
    try {
        const data = {
            request_type,
            requestor_id,
            accepter_id,
            requestor_email,
            accepter_email,
            requestor_role,
            accepter_role,
            property,
            landlord_id,
            email_text: emailContent,
        };
        const request = await Request.findOne({where: {requestor_email, accepter_email,}})
        if(request) {
          return res.status(500).send({
            message: 'User already Invited'
          })
        }
        const invitedBuildings = await Building.findAll({
          where: { 
            building_id: {[Op.in]: property } 
          }
        })
        const delegatioin = await Request.create(data);
        const emailData = {
          id: delegatioin.id,
          accepter_email,
          accepter_role,
          requestor_email,
        }
        sendEmail(res, emailData, emailSubject, emailContent, invitedBuildings );
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }

  },

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
    try {
        const data = {
            request_type,
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
      request.set({accepted: true});
      request.save();
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
          declined: true,
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

  sendNotification: async (req, res) => {
    const subscription = req.body

    console.log(subscription)

    const payload = JSON.stringify({
      title: 'Hello!',
      body: 'It works.',
    })

    webpush.sendNotification(subscription, payload)
      .then(result => console.log(result))
      .catch(e => console.log(e.stack))

    res.status(200).json({'success': true})
    }
};

export default Request_controller;
