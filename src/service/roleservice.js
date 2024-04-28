const {Roles} = require('../model/role.model');

class RoleService{
    constructor(){}

    async findAllRoles(){
        try {
            const roles = await Roles.findAll({where: {rolename: "USER"}});
            return roles;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new RoleService();