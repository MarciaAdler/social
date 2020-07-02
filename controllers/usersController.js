const db = require("../models");
var fs = require("fs");
const { runInNewContext } = require("vm");
module.exports = {
  createUser: function (req, res) {
    db.User.create({
      firstName: req.body.firstName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      city: req.body.city,
      state: req.body.state,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findOne: function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createPost: function (req, res) {
    console.log(req.body);
    db.FeedPost.create({
      post: req.body.post,
      UserId: req.body.UserId,
      image1: req.body.image1,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getPosts: function (req, res) {
    db.FeedPost.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "User",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
};
