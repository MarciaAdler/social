const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const LikePost = sequelize.define("LikePost", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: "FeedPosts",
        key: "id",
      },
    },
  });
  return LikePost;
};
