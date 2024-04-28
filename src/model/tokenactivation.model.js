const sequelize = require('../database/Connection');
const {DataTypes} = require('sequelize');
const { User } = require('./user.model');

 const TokenActivation = sequelize.define('tokenactivation', {
    token: {
        type: DataTypes.TEXT
    }
}, 
{freezeTableName: true,}
);

User.hasOne(TokenActivation);
TokenActivation.belongsTo(User);

module.exports = TokenActivation;