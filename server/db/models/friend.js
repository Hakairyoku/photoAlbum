'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Album }) {
      this.belongsTo(User, { foreignKey: 'userId' })
      this.belongsTo(Album, { foreignKey: 'albumId' })
    }
  }
  Friend.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    albumId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Album",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};