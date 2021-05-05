const db = require("../models");
var fs = require("fs");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const moment = require("moment");

module.exports = {
  getDashboardNewUserInfo: function (req, res) {
    db.User.findAll({
      attributes: [
        [Sequelize.fn("count", Sequelize.col("id")), "count"],
        [
          Sequelize.fn("date_format", Sequelize.col("createdAt"), "%Y-%m-%d"),
          "date_col_formed",
        ],
      ],
      where: {
        createdAt: {
          [Op.gt]: moment().subtract(4, "days").format("YYYY-MM-DD"),

          [Op.lt]: moment().add(1, "days").format("YYYY-MM-DD"),
        },
      },
      group: "date_col_formed",
      order: [[Sequelize.col("date_col_formed"), "ASC"]],
    })
      .then((dbmodel) => {
        res.json(dbmodel);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getDashboardPosts: function (req, res) {
    db.FeedPost.findAll({
      attributes: [
        [Sequelize.fn("count", Sequelize.col("id")), "count"],
        [
          Sequelize.fn("date_format", Sequelize.col("createdAt"), "%Y-%m-%d"),
          "date_col_formed",
        ],
      ],
      where: {
        createdAt: {
          [Op.gt]: moment().subtract(4, "days").format("YYYY-MM-DD"),

          [Op.lt]: moment().add(1, "days").format("YYYY-MM-DD"),
        },
      },
      group: "date_col_formed",
      order: [[Sequelize.col("date_col_formed"), "ASC"]],
    })
      .then((dbmodel) => {
        res.json(dbmodel);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
};
