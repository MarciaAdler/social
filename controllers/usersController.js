const db = require("../models");
var fs = require("fs");
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
};
