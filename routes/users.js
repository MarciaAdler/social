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

router.route("/api/viewprofile/:username").get(usersController.findUser);

router.route("/api/userposts/:id").get(usersController.getUserPosts);

router.route("/api/addcomment").post(usersController.addComment);

router.route("/api/getcomments/:id").get(usersController.getComments);

router.route("/api/getcomments2/:id").get(usersController.getComments2);

router.route("/api/deletecomment/:id").delete(usersController.deleteComment);

router.route("/api/group").post(usersController.createGroup);

router.route("/api/group").get(usersController.setGroups);

router.route("/api/grouppage/:name").get(usersController.getPage);

router.route("/api/grouppost").post(usersController.createGroupPost);

router.route("/api/grouppost/:group").get(usersController.getGroupPosts);

router
  .route("/api/deletegrouppost/:id")
  .delete(usersController.deleteGroupPost);

module.exports = router;
