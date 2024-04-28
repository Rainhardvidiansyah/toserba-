const sequelize = require('../database/Connection');
const {DataTypes} = require ('sequelize');
const {RefreshToken} = require('./refreshtoken.model');

// const {Roles}= require('./role.model');

const User = sequelize.define('User', {
    firstname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    }, //firstname, lastname, username, email, password
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    contactnumber: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {sequelize, freezeTableName: true}
);

User.hasOne(RefreshToken, {
    foreignKey: {
        name: 'user_id',
        onDelete: 'CASCADE',
      }
});
RefreshToken.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        onDelete: 'CASCADE',
      }
});

const syncUser = async ()=> {
    try {
       const user =await User.sync({alter: true});
       const refresh_token = await RefreshToken.sync({alter: true});
       return [user, refresh_token];
        //console.log('User table has been created');
    } catch (error) {
        console.log(error);
    }
};

// User.belongsToMany(Roles, { through: UserRoles});
// Roles.belongsToMany(User, { through: UserRoles });
module.exports = {User, syncUser};