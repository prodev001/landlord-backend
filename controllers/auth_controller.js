import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
const { hashSync, compareSync } = bcrypt;

import models from "../models";
import { expiresInHrs } from "../util/constants";

const User = models.user;
const Role = models.role;
const Op = models.Sequelize.Op

export function signup(req, res) {
  // Save User to Database
  User.update(
    {
      username: req.body.username,
      password: hashSync(req.body.password, 8),
    },
    {where: {email: req.body.email, user_role: req.body.role}}
    )
    .then(user => {
      if (user) {
            res.send({ message: "User was registered successfully!" });
      } else {
          res.send({ message: "User was not registered successfully!" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

export function signin(req, res) {
  User.findOne({
    where: {
      email: req.body.email,
    }
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
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        landlordId: user.landlord_id,
        email: user.email,
      },
      process.env.JWT_KEY,
      {expiresIn: expiresInHrs}
    );
    res.status(200).send({
      landlord_id: user.landlord_id,
      username: user.username,
      email: user.email,
      role: user.user_role,
      accessToken: token
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

export function emailVerify(req, res) {
    // Username
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (!user) {
        res.status(400).send({
          message: "Failed! Email is not exist!"
        });
      }
      res.status(200).json({
        message: 'Success!',
        userInfo: {
          role: user.user_role,
          email: user.email
        },
      });
    });
}