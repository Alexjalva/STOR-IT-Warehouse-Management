const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model { }

//More complex than expected, need to check previous activities as guide//
User.init(
    {
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // could add more//
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            },
        },
    }
);
module.exports = User;