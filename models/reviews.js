'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      reviews.belongsTo(users, {foreignKey:"users_username"});
    }
  }
  reviews.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: "reviews",
    modelName: 'reviews',
  });
  return reviews;
};