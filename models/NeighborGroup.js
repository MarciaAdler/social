// creating feed post model
module.exports = function (sequelize, DataTypes) {
  var NeighborGroup = sequelize.define("NeighborGroup", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "no image",
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  return NeighborGroup;
};
