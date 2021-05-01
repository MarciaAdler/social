// creating feed post model
module.exports = function (sequelize, DataTypes) {
  var FeedPost = sequelize.define("FeedPost", {
    post: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
      defaultValue: "no image",
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  FeedPost.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    FeedPost.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    FeedPost.hasMany(models.FeedPostComment, {
      foreignKey: "PostId",
    });
  };
  return FeedPost;
};
