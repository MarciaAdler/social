// creating feed post comment model
module.exports = function (sequelize, DataTypes) {
  var FeedPostComment = sequelize.define("FeedPostComment", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image1: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });
  FeedPostComment.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    FeedPostComment.belongsTo(models.User, {
      foreignKey: "CommenterId",
      as: "Commenter",
      allowNull: false,
    });

    // FeedPostComment.belongsTo(models.FeedPost, {
    //   foreignKey: {
    //     allowNull: false,
    //   },
    // });
  };
  return FeedPostComment;
};
