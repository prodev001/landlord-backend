import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
import bcrypt from 'bcryptjs';
const { hashSync, compareSync } = bcrypt;

import models from "../models";
import { secret } from "../config/auth.config";

const User = models.user;
const Role = models.role;
const Op = models.Sequelize.Op

export function signup(req, res) {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashSync(req.body.password, 8),
    role: req.body.role
  })
    .then(user => {
      console.log(req.body.role);
      if (req.body.role) {
        Role.findOne({
          where: {
            name: req.body.role
          }
        }).then(role => {
          console.log(role,  'xasfasdfasfsf');
          user.addRole(role).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
          res.send({ message: "User was registered successfully!" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
export function signin(req, res) {
  console.log(req.body, 'adfasdfasdfasf');
  User.findOne({
    where: {
      email: req.body.email
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
      var token = sign({ id: user.id }, secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          role: roles[0].name,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}