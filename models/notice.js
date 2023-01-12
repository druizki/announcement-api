'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Notice.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    content: DataTypes.TEXT,
    label: DataTypes.STRING,
    banner: DataTypes.TEXT,
    isDraft: DataTypes.BOOLEAN,
    totalViews: {
      type:DataTypes.INTEGER,
      defaultValue: 0
    },
    publishedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Notice',
  });
  return Notice;
};