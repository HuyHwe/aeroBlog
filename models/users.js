'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({reviews}) {
      // define association here
      users.hasMany(reviews, {foreignKey:"users_username"});
    }
  }
  users.init({
    username: {
      type: DataTypes.STRING,
      primaryKey:true},
    password: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'users',
  });
  return users;
};