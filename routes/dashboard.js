const router = require("express").Router();
const dashboardController = require("../controllers/dashboardController");
const db = require("../models");

router
  .route("/api/dashboardnewusers")
  .get(dashboardController.getDashboardNewUserInfo);

router.route("/api/dashboardposts").get(dashboardController.getDashboardPosts);

module.exports = router;
