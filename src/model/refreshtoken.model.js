const sequelize = require('../database/Connection');
const {DataTypes} = require('sequelize');

const RefreshToken = sequelize.define('refreshtoken', {
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {sequelize, freezeTableName: true});

const syncRefreshToken = async() => {
    try {
        return await RefreshToken.sync({alter:true});
    } catch (error) {
        console.log(error);
    }
};
module.exports = {RefreshToken, syncRefreshToken};