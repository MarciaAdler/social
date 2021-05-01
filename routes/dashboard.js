const router = require("express").Router();
const dashboardController = require("../controllers/dashboardController");
const db = require("../models");

router
  .route("/api/dashboardnewusers")
  .get(dashboardController.getDashboardNewUserInfo);

module.exports = router;
