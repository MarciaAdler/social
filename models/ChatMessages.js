// creating feed chatmessages model
module.exports = function (sequelize, DataTypes) {
  var ChatMessage = sequelize.define("ChatMessage", {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  });
  ChatMessage.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    ChatMessage.belongsTo(models.User, {
      foreignKey: "SenderId",
      as: "Sender",
    });
    ChatMessage.belongsTo(models.User, {
      foreignKey: "ReceiverId",
      as: "Receiver",
    });
  };
  return ChatMessage;
};
