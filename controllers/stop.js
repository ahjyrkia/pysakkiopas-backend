'use strict'

const HSLService = require("../services/HSLService")
const Stop = require("../models/Stop");


module.exports.findAll = (req, res) => {
  Stop
  .findAll()
  .then(stops => {
    res.status(200).send(stops);
  })
  // .catch(err => {
  //   res.status(500).send({
  //     location: "Stop findAll .catch other",
  //     message: "Getting all Stops caused an internal server error.",
  //     error: err,
  //   });
  // });
};

module.exports.findOne = (req, res) => {
  HSLService
  .getStop(req.params.id)
  .then(stop => {
    res.status(200).send(stop);
  })
  // .catch(err => {
  //   res.status(500).send({
  //     location: "Stop findAll .catch other",
  //     message: "Getting all Stops caused an internal server error.",
  //     error: err,
  //   });
  // });
};
