import db from "../models";
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
export const create = (req, res) => {
  
};
// Retrieve all Tutorials from the database.
export const findAll = (req, res) => {
  
};
// Find a single Tutorial with an id
export const findOne = (req, res) => {
  
};
// Update a Tutorial by the id in the request
export const update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
// export const delete = (req, res) => {
  
// };
// Delete all Tutorials from the database.
export const deleteAll = (req, res) => {
  
};
// Find all published Tutorials
export const findAllPublished = (req, res) => {
  
};

export const allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
export const userBoard = (req, res) => {
res.status(200).send("User Content.");
};
export const adminBoard = (req, res) => {
res.status(200).send("Admin Content.");
};
export const moderatorBoard = (req, res) => {
res.status(200).send("Moderator Content.");
};