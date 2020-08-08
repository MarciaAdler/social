// creating feed post model
module.exports = function (sequelize, DataTypes) {
  var GroupPost = sequelize.define("GroupPost", {
    post: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image1: {
      type: DataTypes.STRING,
    },
  });
  GroupPost.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    GroupPost.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    GroupPost.belongsTo(models.NeighborGroup, {
      foreignKey: "GroupId",
      as: "Group",
      allowNull: false,
    });
  };
  return GroupPost;
};
