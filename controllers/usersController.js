const db = require("../models");
var fs = require("fs");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = {
  createUser: function (req, res) {
    db.User.create({
      firstName: req.body.firstName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      city: req.body.city,
      state: req.body.state,
      image: req.body.image,
      link: req.body.link,
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
  deletePost: function (req, res) {
    db.FeedPost.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  updateProfile: function (req, res) {
    console.log(req.body);
    db.User.update(
      {
        username: req.body.username,
        email: req.body.email,
        city: req.body.city,
        state: req.body.state,
        firstName: req.body.firstName,
        image: req.body.image,
        bio: req.body.bio,
        link: req.body.link,
      },
      {
        where: { id: req.body.id },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  refreshCurrentUser: function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findUser: function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getUserPosts: function (req, res) {
    db.FeedPost.findAll({
      where: {
        UserId: req.params.id,
      },
      order: [["createdAt", "DESC"]],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  addComment: function (req, res) {
    db.FeedPostComment.create({
      comment: req.body.comment,
      PostId: req.body.PostId,
      CommenterId: req.body.CommenterId,
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getComments: function (req, res) {
    db.FeedPostComment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "Commenter",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getComments2: function (req, res) {
    db.FeedPostComment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "Commenter",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deleteComment: function (req, res) {
    db.FeedPostComment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createGroup: function (req, res) {
    db.NeighborGroup.create({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      AdminId: req.body.AdminId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  setGroups: function (req, res) {
    db.NeighborGroup.findAll({
      include: [
        {
          model: db.User,
          as: "Admin",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getPage: function (req, res) {
    const name = req.params.name.replace(/%20/g, " ");
    db.NeighborGroup.findOne({
      where: {
        name: name,
      },
      include: [
        {
          model: db.User,
          as: "Admin",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createGroupPost: function (req, res) {
    db.GroupPost.create({
      post: req.body.post,
      UserId: req.body.UserId,
      image1: req.body.image1,
      GroupId: req.body.GroupId,
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getGroupPosts: function (req, res) {
    console.log(req.params);
    db.GroupPost.findAll({
      where: { GroupId: req.params.group },
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
  deleteGroupPost: function (req, res) {
    db.GroupPost.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  addGroupComment: function (req, res) {
    db.GroupPostComment.create({
      comment: req.body.comment,
      PostId: req.body.PostId,
      CommenterId: req.body.CommenterId,
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getGroupComments: function (req, res) {
    db.GroupPostComment.findAll({
      where: { PostId: req.params.id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "Commenter",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deleteGroupComment: function (req, res) {
    db.GroupPostComment.destroy({
      where: { id: req.params.id },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  updateGroup: function (req, res) {
    console.log(req.params);
    console.log(req.body);
    db.NeighborGroup.update(
      {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
      },
      {
        where: { id: req.body.id },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  refreshGroup: function (req, res) {
    console.log("refresh", req.params);
    db.NeighborGroup.findOne({
      where: {
        id: req.params.group,
      },
      include: [
        {
          model: db.User,
          as: "Admin",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  updateImageName: function (req, res) {
    console.log("updateimage", req.body);
    db.NeighborGroup.update(
      {
        image: req.body.image,
      },
      {
        where: { id: req.body.id },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  updateProfileImageName: function (req, res) {
    console.log("updateprofileimage", req.body);
    db.User.update(
      {
        image: req.body.image,
      },
      {
        where: { id: req.body.id },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getUsers: function (req, res) {
    db.User.findAll({
      order: [["username", "ASC"]],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  writeMessage: function (req, res) {
    db.ChatMessage.create({
      message: req.body.message,
      SenderId: req.body.sender,
      ReceiverId: req.body.receiver,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getMessages: function (req, res) {
    console.log("body", req.body);
    console.log("params", req.params);
    db.ChatMessage.findAll({
      where: {
        [Op.or]: [
          {
            SenderId: req.params.SenderId,
            ReceiverId: req.params.ReceiverId,
          },
          {
            SenderId: req.params.ReceiverId,
            ReceiverId: req.params.SenderId,
          },
        ],
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.User,
          as: "Sender",
        },
        {
          model: db.User,
          as: "Receiver",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createDoc: function (req, res) {
    db.Resource.create({
      name: req.body.name,
      document: req.body.document,
      description: req.body.description,
      AdminId: req.body.AdminId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getDocs: function (req, res) {
    db.Resource.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "Admin",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deleteDoc: function (req, res) {
    console.log(req.params);
    db.Resource.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  countUsers: function (req, res) {
    db.User.count({
      where: { role: "Neighbor" },
      distinct: "id",
    })
      .then((count) => res.json(count))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  feedpostCount: function (req, res) {
    db.FeedPost.count({
      distinct: "id",
    })
      .then((count) => res.json(count))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  uniqueFeedPosters: function (req, res) {
    db.FeedPost.findAll({
      attributes: [
        [Sequelize.fn("distinct", Sequelize.col("UserId")), "userid"],
      ],
    })
      .then((dbmodel) => {
        res.json(dbmodel);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },

  getUniqueFeedPostersInfo: function (req, res) {
    console.log(req.params);
    db.FeedPost.findAll({
      where: {
        UserId: req.params.userid,
        createdAt: {
          [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 3)),
          [Op.lt]: new Date(),
        },
      },
      include: [
        {
          model: db.User,
          as: "User",
        },
      ],
    })
      .then((dbmodel) => {
        res.json(dbmodel);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getNewUsers: function (req, res) {
    db.User.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 3)),
          [Op.lt]: new Date(),
        },
      },
      order: [["createdAt", "DESC"]],
    })
      .then((dbmodel) => {
        res.json(dbmodel);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  likePost: function (req, res) {
    db.LikePost.create({
      userId: req.body.userId,
      postId: req.body.postId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getUserLiked: function (req, res) {
    console.log(req.params);
    db.LikePost.findAll({
      where: {
        userId: req.params.userid,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getAllLikes: function (req, res) {
    db.LikePost.findAll({
      where: {
        postId: req.params.postid,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  updateLike: function (req, res) {
    console.log(req.params);
    db.LikePost.destroy({
      where: {
        userId: req.params.userid,
        postId: req.params.postid,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
};
