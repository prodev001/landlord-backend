
import jwt from 'jsonwebtoken';
import models from "../models";

const User = models.User;

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
    req.userData = { 
      name:decoded.username, 
      email: decoded.email, 
      userId: decoded.userId, 
      landlordId: decoded.landlordId, 
      role: decoded.role,
      property: decoded.property
    };
    next();
  });
};

export default authJwt;

