import models from "../models";

const User = models.User;
const Landlord =  models.Landlord;
const Request = models.Request;

const verifySignUp = async (req, res, next) => {
  // Username
  const role = req.body.role;
  const email = req.body.email

  try {
    if(role === 'll') {
        const landlord = await Landlord.findOne({ where: { email_address: email } })
        if(landlord) {
          const user_name = await User.findOne({ where: { username: req.body.username }})
          if (user_name) {
            return res.status(400).send({message: "Failed! Username is already in use!"});
          } 
          const user_email = await User.findOne({  where: { email: req.body.email } })
          if(user_email) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
          } 
          next();
        } else {
          res.status(400).send({
            message: "Failed! Landlord doesn't exist!"
          });
        }
    } else {
      const request = await Request.findOne({
        where: {
          accepter_email: email,
          accepter_role: role
      }})
      if(request) {
        const user_name = await User.findOne({ where: { username: req.body.username }})
        if (user_name) {        
          return res.status(400).send({ message: "Failed! Username is already in use!" });
        } 
        const user_email = await User.findOne({  where: { email: req.body.email } })
        if(user_email) {
          return res.status(400).send({ message: "Failed! Email is already in use!" });
        } 
        next();
      } else {
        res.status(400).send({
          message: "Failed! User is not invited"
        });
      }
    }
  }
  catch (error) {
    console.log(error.response);
    res.status(400).send({
      message: error.message
    });
  }
};

export default verifySignUp;