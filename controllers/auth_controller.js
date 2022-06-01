import jwt, { decode } from "jsonwebtoken";
import bcrypt from 'bcryptjs';
const { hashSync, compareSync } = bcrypt;

import models from "../models";
import { expiresInHrs } from "../constants/jwt_constants";

const User = models.User;
const Landlord = models.Landlord;
const Delegation = models.Delegation;
const Request = models.Request;
const VicePresident = models.VicePresident;
const RegionalManager = models.RegionalManager;
const PropertyManager = models.PropertyMananger;

export async function  signup(req, res) {
  
  const username = req.body.username;
  const email = req.body.email
  const password = hashSync(req.body.password, 8);
  const role = req.body.role;
  const landlord_id = req.body.landlordId
  try {
    const user = await User.create({
                        username,
                        email,
                        password,
                        role,
                        landlord_id,
                        active: true
                      });
                      console.log(user);
    
    if (role !== 'll') {
        const request = await Request.findOne({
                  where: {
                    accepter_email: email,
                    accepter_role: role,
                  }
              })
        request.set({accepted: true})
        request.save();
        await Delegation.create({
            accepter_email: request.accepter_email,
            accepter_role: request.accepter_role,
            requestor_email: request.requestor_email,
            requestor_role: request.requestor_role,
            property: request.property,
            accepter_id: user.id,
            requestor_id: request.requestor_id,
            landlord_id: request.landlord_id
          });
    } else {
      const landlord = await Landlord.findOne({ where: {landlord_id: landlord_id}});
      landlord.set({active: true});
      landlord.save();
    }
    res.status(200).send({ message: "Account creation successful!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  
}

export function signin(req, res) {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!"
      });
    }

    let token;
    if(user.role !== 'admin' && user.role !== 'll' ) {
      Delegation.findOne({
        where: {
          accepter_email: user.email,
          accepter_role: user.role
        }
      }).then(delegation => {
        token = jwt.sign(
          {
            userId: user.id,
            landlordId: user.landlord_id,
            email: user.email,
            username: user.username,
            role: user.role,
            property: delegation.property
          },
          process.env.JWT_KEY,
          {expiresIn: expiresInHrs}
        );
        
        res.status(200).send({
          message: 'LogIn Success!',
          data: {
            landlord_id: user.landlord_id,
            username: user.username,
            email: user.email,
            role: user.role,
            accessToken: token
          }
        });
        
      })
    } else {
      token = jwt.sign(
        {
          userId: user.id,
          landlordId: user.landlord_id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_KEY,
        {expiresIn: expiresInHrs}
      );

      res.status(200).send({
        message: 'LogIn Success!',
        data: {
          landlord_id: user.landlord_id,
          username: user.username,
          email: user.email,
          role: user.role,
          accessToken: token
        }
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

export function emailVerify(req, res) {
    // Username
    Landlord.findOne({
      where: {
        email_address: req.body.email
      }
    }).then(user => {
      if (!user) {
        res.status(400).send({
          message: "Failed! Email is not exist!"
        });
        return;
      }
      res.status(200).send({
        data: {
          role: 'll',
          email: user.email_address,
          landlordId: user.landlord_id
        },
      });
    });
}

export function checkToken(req, res) {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Token is Expired!"
        });
      }
      const userData = { 
        email: decoded.email, 
        role: decoded.role, 
        landlordId: decoded.landlordId
      };
      if(decoded.role !== 'll') {
        Delegation.update({
          accepted: true,
        },{
          where: {id: decoded.id}
        })
      }
      res.status(200).send({
        data: userData
      });
    });
  } catch (error) {
    res.status(500).send({message: error.message})
  }
}

export function setDeclineReason(req, res) {
  try {
    const {decline, token} = req.body;
    console.log(decline, token);
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Token is Expired!"
        });
      }
      Delegation.update({
        declined: true,
        decline_reason: decline,
      },
      {
        where: {id: decoded.id}
      })
      res.status(200).send({
        message: 'Decline Success!'
      });
    });
  } catch (error) {
    res.status(500).send({message: error.message})
  }
}