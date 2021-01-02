// creating feed post model
module.exports = function (sequelize, DataTypes) {
  var Resource = sequelize.define("Resource", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    document: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  Resource.associate = function (models) {
    Resource.belongsTo(models.User, {
      foreignKey: "AdminId",
      as: "Admin",
      allowNull: false,
    });
  };
  return Resource;
};
