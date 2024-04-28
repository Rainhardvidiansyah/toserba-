const UserRoles = require('../model/user.roles.model');
const { QueryTypes } = require('../database/Connection');

// const {Roles} = require('../model/role.model');


class UserRolesService{
    constructor(){}

    async SaveUserWithRole(user_id, role_id) {
        try {
            const SaveUserInUserRoles = await UserRoles.create({
                user_id, role_id
            });
            
            return SaveUserInUserRoles;

        } catch (error) {
            console.error(error);
        }
    }

    async findUserRole(user_id){
        try{
            const userRoles = await UserRoles.findOne({
                // where: {user_id: user_id, role_id: 2},
                where: {user_id: user_id},
                // include: [{model: User}]
                });
                if(userRoles){
                    console.log(userRoles.role_id);
                    console.log("Oke" + userRoles.role_id);
                    return userRoles;
                }else{
                    console.log("Tidak ada perannya");
                    //return userRoles.role_id?.null;
                }
                
        }
        catch (error) {
            console.error(error);
        }
    }
    

    loging(){
        console.log(QueryTypes);
    }
}

module.exports = new UserRolesService();