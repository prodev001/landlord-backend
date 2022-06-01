import aws_sdk from 'aws-sdk';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import InviteEmailTemplate from './templates/inviteEmailTemplate';
import inviteLandlordEmailTemplate from './templates/inviteLandlordEmailTemplate';
import { expiresInHrs } from "../constants/jwt_constants";

const { hashSync, compareSync } = bcrypt;
const { SES } = aws_sdk;

const SESConfig = {
    apiVersion: '2021-1-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
}

export const sendEmail = (res, emailData, emailSubject, emailContent, invitedBuildings) => {
    const {
        id, 
        accepter_email,
        accepter_role,
    } = emailData;

    const token = jwt.sign(
            {
                id,
                email: accepter_email,
                role: accepter_role,
            },
            process.env.JWT_KEY,
            {expiresIn: expiresInHrs}
        );
        
        const link = {
            accept_link : `${process.env.FRONTEND_URL}/invite/accept/${token}`,
            decline_link : `${process.env.FRONTEND_URL}/invite/decline/${token}`
        }
        const msgBody = InviteEmailTemplate(emailData, link, emailContent, invitedBuildings);
      
      const params = {
          Destination: {
              CcAddresses: [
                accepter_email
                  ],
              ToAddresses: [
                accepter_email
              ],
          },
          Message: {
          Body: {
              Html: {
              Charset: "UTF-8",
              Data: msgBody,
              },
              Text: {
              Charset: "UTF-8",
              Data: "TEXT_FORMAT_BODY",
              },
          },
          Subject: {
              Charset: "UTF-8",
              Data: emailSubject,
          },
          },
          Source: `LeapEasy <${process.env.MAIL_FROM_ADDRESS}>`, // SENDER_ADDRESS
          ReplyToAddresses: [
              `${process.env.MAIL_FROM_ADDRESS}`
          ],
      };

    new SES(SESConfig).sendEmail(params).promise().then(response => {
        res.status(200).send({
            message: 'Delegation email has been sent to'
        });
    }).catch(err => {
        console.log(err);
        return res.status(401).send({
            message: "Failed to send Delegatio email."
        });
    })
}

export const sendLandlordInviteEmail = async (res, data) => {
    const {
        toEmail,
        emailSubject,
        emailContent,
        landlordId
    } = data;

    const token = jwt.sign(
            {
                email: toEmail,
                role: 'll',
                landlordId
            },
            process.env.JWT_KEY,
            {expiresIn: expiresInHrs}
        );
        
        const link = `${process.env.FRONTEND_URL}/invite/accept/${token}`;
        const msgBody = inviteLandlordEmailTemplate(data, link, emailContent);
      const params = {
          Destination: {
              CcAddresses: [
                toEmail
                  ],
              ToAddresses: [
                toEmail
              ],
          },
          Message: {
          Body: {
              Html: {
              Charset: "UTF-8",
              Data: msgBody,
              },
              Text: {
              Charset: "UTF-8",
              Data: "TEXT_FORMAT_BODY",
              },
          },
          Subject: {
              Charset: "UTF-8",
              Data: emailSubject,
          },
          },
          Source: `LeapEasy <${process.env.MAIL_FROM_ADDRESS}>`, // SENDER_ADDRESS
          ReplyToAddresses: [
              `${process.env.MAIL_FROM_ADDRESS}`
          ],
      };

    new SES(SESConfig).sendEmail(params).promise().then(response => {
        res.status(200).send({
            message: 'Delegation email has been sent to'
        });
    }).catch(err => {
        console.log(err);
        return res.status(401).send({
            message: "Failed to send Delegatio email."
        });
    })
}