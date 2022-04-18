
import jwt from 'jsonwebtoken';
import models from "../models";

const User = models.user;

const authJwt = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userData = { email: decoded.email, userId: decoded.userId, landlordId: decoded.landlordId };
    next();
  });
};

export default authJwt;

