const sequelize = require('../database/Connection');
const {DataTypes} = require('sequelize');
const {Roles} = require('../model/role.model');
const {User} = require('../model/user.model');

const UserRoles = sequelize.define('UserRoles', {
    UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: User, 
          key: 'id'
        }
    },
    RoleId: {
        type: DataTypes.INTEGER,
        references: {
          model: Roles, 
          key: 'id'
        }
    }
});

User.belongsToMany(Roles, { through: UserRoles});
Roles.belongsToMany(User, { through: UserRoles });




module.exports = UserRoles;