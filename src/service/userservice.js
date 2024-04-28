const { Roles } = require('../model/role.model');
const {User} = require('../model/user.model');
const bcrypt = require('bcrypt');
const UserRoles = require('../model/user.roles.model');





class UserService{
    constructor(){}
////firstname, lastname, email, password

    Registration = async (firstname, lastname, email, password) => {
        
        ////firstname, lastname, username, email, password
        try {
        let firstCharacter = firstname.charAt(0);
        let username = firstCharacter + "_" + lastname;
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hashedPassword,
            active: 0
        });

        const role = await Roles.findOne({where: {rolename: "USER"}});
        await user.addRoles(role);
        return user;
    } catch (error) {
        console.error(error);
    }
};

    findUserByEmail = async (email) => {
        try {
            const user = await User.findOne({ 
                where: {email},
                include: [{model: Roles, attributes:["rolename"]}]
            });
            return user;
        } catch (error) {
            console.error(error);
        }
    };

    findUserById = async (id) => {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            console.error(error);
        }
    };


    findAllUsers = async () => {
        try {
          const users = await User.findAll({
                include: [{
                    model: Roles,
                    //through: UserRoles,
                    attributes: ['rolename']
                }]
            });
            //console.log(users);
            return users;
        } catch (error) {
            console.log(error);
        }
    };


    userIdFinding = async(id) => {
        try {
            
            const user = await User.findByPk(id, {
                attributes: ["username", "email"],
                include: [{model: Roles, through: UserRoles, attributes:["rolename"]}]
                
            });
            // return user.Roles[0].UserRoles; works
            // return user.Roles[0].UserRoles.RoleId; works.
            // return user.Roles[0].rolename === "USER";
            return user.Roles[0].rolename;
        } catch (error) {
            console.log(error);
        }
    };

    updateProfile = async(id, username) =>{
        try {
            const user = await User.update(
                { username: username },
                { where: {id:id} }
            );
            return user;
            
        } catch (error) {
            console.log(error);
        }
    };

    //update user set active = true where user.id = value_id;
    activateUser = async (userId) => {
        try {
            const user = await User.update(
                { active: true },
                { where: { id: userId } }
            );
            return user;
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = new UserService();