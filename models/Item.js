const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

// Need to figure out what exactly to add to rest of models //
Item.init (
    {
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        data: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        dimensions:{
            type: DataTypes.Text,
            allowNull: false,
        },
        category: {

        },
        who_belongs: {

        },
        location: {

        },
        value: {

        },
        picture: {

        },
        comments: {

        },
      },
      {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'item',
      }
);
module.exports = Item;