'use strict';
const { sign } = require('jsonwebtoken');
const { pick } = require('lodash');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.prototype.issueToken = function () {
      let payload = pick(this.get({ plain: true }), ['id', 'name', 'email']);
      let token = sign(payload, process.env.SECRET, {
        expiresIn: 60 * 60 * 24
      });
      return `Bearer ${token}`;
  }
  return User;
};