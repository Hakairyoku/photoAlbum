'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Friend, Photo }) {
      this.belongsTo(User, { foreignKey: 'userId' })
      this.hasMany(Friend, { foreignKey: 'albumId' })
      this.hasMany(Photo, { foreignKey: 'albumId' })
    }
  }
  Album.init({
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    img: {
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};