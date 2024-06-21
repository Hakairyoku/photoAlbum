'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Album }) {
      this.belongsTo(Album, { foreignKey: 'albumId' })
    }
  }
  Photo.init({
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    img: {
      type: DataTypes.TEXT
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
    modelName: 'Photo',
  });
  return Photo;
};