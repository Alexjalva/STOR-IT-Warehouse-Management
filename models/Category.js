const { type } = require('os');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model { }

// need to finish adding models//
Category.init(
    {
        name: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
       products: {
       type: DataTypes.INTEGER,
       },
    }
)
module.exports = Category;