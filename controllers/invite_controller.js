import models from '../models';
import Sequelize from 'sequelize';
var Op = Sequelize.Op;

import {sendLandlordInviteEmail, sendEmail} from '../util/util';
import sendNotification from '../util/websocket';

const Request = models.Request;
const Delegation = models.Delegation;
const Building = models.Building;

const InviteController = {

  createLandlordInvite: async (req, res) => {
    const {toEmail, emailContent, emailSubject, landlordID} = req.body;
    const userData = req.userData;
    console.log(userData);
    try {
        for (let index = 0; index < toEmail.length; index++) {
            const request = await Request.findOne({
                                where: {accepter_email: toEmail[index]}
                            });
            if(request) {
                return res.status(500).send({
                    message: 'User already Invited'
                })
            }
            const requestData = {
                request_type: 'invite',
                requestor_email: userData.email,
                accepter_email: toEmail[index],
                requestor_id: userData.userId,
                requestor_role: userData.role,
                accepter_role: 'll',
                landlord_id: landlordID[index],
                email_text: emailContent,
                request_status: 'pending',
                property: []
            };

            await Request.create(requestData);

            const data = {
              toEmail: toEmail[index],
              emailSubject,
              emailContent,
              landlordId: landlordID[index]
            }

            await sendLandlordInviteEmail(res, data);
            res.status(200).send("Email Sent successful!");
        }  
    } catch (error) {
        return res.status(401).send(error);
    } 
  },

  createUserInvite: async (req, res) => {
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
    const request_status = 'pending';
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
        await sendEmail(emailData, emailSubject, emailContent, invitedBuildings );
        // sendNotification(data);
        res.status(200).send('Delegation email sent successfully!');
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
    let buildings, delegate_buildings, request_buildings;
    try {
        if(userRole === 'll') {
            buildings = await Building.findAll({
            where: {
                landlord_id: landlordId,
            },
            // offset: 100, limit: 10
            })
            delegate_buildings = await  Delegation.findAll({
                where: {
                requestor_email: userEmail,
                requestor_role: userRole
                }
            })
            if(delegate_buildings.length > 0) {
                delegate_buildings.forEach(request => {
                buildings = buildings.filter(building => !request.property.includes(building.building_id));
                })
            }
            request_buildings = await  Request.findAll({
                where: {
                requestor_email: userEmail,
                requestor_role: userRole
                }
            })
            if(request_buildings.length > 0) {
                request_buildings.forEach(delegate => {
                buildings = buildings.filter(building => !delegate.property.includes(building.building_id));
                })
            }
        } else if (userRole === 'vp' || userRole === 'rm' || userRole === 'pm') {
            let buildingIds = property;    
            delegate_buildings = await Delegation.findAll({
                where: {
                requestor_email: userEmail,
                requestor_role: userRole
                }
            })
            if(delegate_buildings.length > 0) {
                delegate_buildings.forEach(delegate => {
                    buildingIds = buildingIds.filter(id => !delegate.property.includes(id));
                })
            }
            request_buildings = await  Request.findAll({
                where: {
                requestor_email: userEmail,
                requestor_role: userRole
                }
            })
            if(request_buildings.length > 0) {
                request_buildings.forEach(request => {
                    buildingIds = buildingIds.filter(building => !request.property.includes(id));
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

};

export default InviteController;
