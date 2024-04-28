const userAddressService = require('../service/useraddressservice');
const userService = require('../service/userservice');
const tokenActivationService = require('../service/tokenactivationservice');

const roleForUser = (req, res, next) => {
    req.roles.forEach(element => {
        if(element === "ADMIN") {
            res.send("ADMIN");
        }else if(element === "USER") {
            res.send("USER");
        }
    });
    next();
};


// const roleForUser = (req, res, next) => {
//     if(req.roles.includes("USER")) {
//         return res.send("Kamu pengguna");
        
//     }else if(req.roles.includes("ADMIN")) {
//         return res.send("Kamu administrator");
//     }
//     next();
// };

const updateUserNameMiddleware = (req, res, next) => {
    const reqId = req.id;
    const userId = req.params.id;
    console.log(`user id is: ${userId} and decode id is: ${reqId}`);
    if(reqId != userId) {
        return res.status(401).json({message:"invalid id or user doesn't exist"});
    }
    next();
};

const validateUserAddressOwnership = async (req, res, next) => {
    try {
    const userId = req.id;
    const addressId = req.params.id;
    const address = await userAddressService.findAddressById(addressId);
    if(!address){
        return res.status(404).json({message: "address not found"});
    }

    if(address.UserId !== userId) {
        return res.status(401).json({message: "Unauthorized: User does not own this address!"});
    }

    req.address = address;
    next();
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
};

const validateUserActive = async(req, res, next) => {
    try {
        const userId = req.id;
        const user = await userService.findUserById(userId);
        if(!user){
            return res.status(404).json({message: "user not found"});
        }
        if(user.active === false) {
            return res.status(403).json({message: "Please activate your account"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
};

const activateUserMiddleware = async (req, res, next) => {
    try {
        const userid = req.query.userid;
        let parseUserIdQuery = parseInt(userid, 10);

        if(typeof parseUserIdQuery !== 'number'){
            return res.status(500).json({message: "User id is not a number"});
        }

        const tokenQuery = req.query.token;
        const userToken = await tokenActivationService.findOneToken(tokenQuery);
        console.log(userToken);

        if(userToken.UserId !== parseUserIdQuery){
            return res.status(403).json({message: 'you don\'t belong to this token'});
        }
        
        console.log(typeof userToken.UserId);
        req.userToken = userToken;

        next();
    } catch (error) {
        console.log(error);
        res.status(error.status);
    }
  

};


module.exports = {
    roleForUser, updateUserNameMiddleware,
    validateUserAddressOwnership, validateUserActive,
    activateUserMiddleware
};



