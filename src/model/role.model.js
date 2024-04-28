const sequelize = require('../database/Connection');
const {DataTypes} = require('sequelize');

const Roles = sequelize.define('Roles', {
    rolename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, freezeTableName: true});

const syncRoles = async() => {
    try {
        return await Roles.sync();
    } catch (error) {
        console.log(error);
    }
    
};

module.exports = {Roles, syncRoles};