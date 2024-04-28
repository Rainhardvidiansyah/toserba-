const sequelize = require('../database/Connection');
const { DataTypes } = require('sequelize');
const {User} = require('./user.model');

const UserAddress = sequelize.define('useraddress', {
    street : {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subdistrict: {
        type: DataTypes.STRING,
        allowNull: true
    },
    district: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    indexes:[{
        fields: ['street']
    }]
});

User.hasMany(UserAddress);
UserAddress.belongsTo(User);

module.exports = UserAddress;

