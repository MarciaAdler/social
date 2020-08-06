// creating feed post model
module.exports = function (sequelize, DataTypes) {
  var NeighborGroup = sequelize.define("NeighborGroup", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "no image",
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  NeighborGroup.associate = function (models) {
    NeighborGroup.belongsTo(models.User, {
      foreignKey: "AdminId",
      as: "Admin",
      allowNull: false,
    });
  };
  return NeighborGroup;
};
