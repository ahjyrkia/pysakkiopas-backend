"use strict";

const express = require("express");
const router = new express.Router();

const auth = require("../middleware/authentication");

const stopCtrl = require("../controllers/stop");
const routeCtrl = require("../controllers/route")

const authTest = (req, res) => {
  res.json({
    message: "You've successfully authenticated.",
  });
};

router.get("/auth", auth.authenticate, authTest);

// router.use("", auth.authenticate);

// Routes for all users

router.get("/stop", stopCtrl.findAll);
router.get("/stop/:id", stopCtrl.findOne);
router.get("/route/:coordinates", routeCtrl.findOne)
router.get("/routes/:addresses", routeCtrl.findFullRoute)
router.get("/origin/:coordinates", routeCtrl.findAddress)

// router.put("/stop/:id", StopCtrl.updateOne);
// router.post("/stop", StopCtrl.saveOne);
// router.delete("/Stop/:id", StopCtrl.deleteOne);


// Routes accessisable only for admin

// router.use("", auth.onlyAdmin);
module.exports = router;
