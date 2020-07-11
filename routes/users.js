const router = require("express").Router();
const passport = require("../config/passport");
const usersController = require("../controllers/usersController");
const db = require("../models");

router.route("/api/signup").post(usersController.createUser);

router.post(
  "/api/login",
  passport.authenticate("local"),
  usersController.findOne
);

router.route("/api/post").post(usersController.createPost);

router.route("/api/post").get(usersController.getPosts);

router.route("/api/deletepost/:id").delete(usersController.deletePost);

router.route("/api/updateprofile").put(usersController.updateProfile);

router.route("/api/user/:id").get(usersController.refreshCurrentUser);

module.exports = router;
