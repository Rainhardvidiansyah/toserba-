const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const sendEmail = require('../service/emailservice');
const endpointToActivateUser = require('../utils/linktoactivateuser');
const userService = require('../service/userservice');
const userservice = require('../service/userservice');
const tokenservice = require('../service/tokenactivationservice');
const generateToken = require('../utils/tokenactivationgenerator');



class UserController{
    constructor(){}

////firstname, lastname, username, email, password
    async registerUser(req, res){
        try {
            const {firstname, lastname, email, password} = req.body;
            const isEmailSame = await userService.findUserByEmail(email);
            if(isEmailSame) {
                return res.status(400).json({message: "Email already exists!"});
            }
            const user = await userService.Registration(firstname, lastname, email, password);

            //TOKEN
            const token = generateToken.generateString();
            console.log(`token generator is ${token}`);
            await tokenservice.createTokenActivation(token, user.id);
            const userToken = await tokenservice.findTokenByUserId(user.id);

            const activateToken = await endpointToActivateUser(user.id, userToken.token);

            console.log(`user id is ${user.id}`);
            sendEmail(email, activateToken);
            //END OF TOKEN

            console.log(user.username + " created");
            return res.status(201).json({message: "Registration successful"});
        } catch (error) {
            console.log(error);
        }
    }

     async Login (req, res){
        try {
            const {email, password} = req.body;
            const user = await userService.findUserByEmail(email);
            if(!user) {
                return res.status(400).json({message: "Email does not exist!"});
            }
            const isMatched = await bcrypt.compare(password, user.password);
            if(!isMatched) {
                return res.status(400).json({message: "Password does not match!"});
            }

            let roles = [];
            user.Roles.forEach(role => {
                roles.push(role.rolename);
            });

            console.log("User role in login method User Controller: " +roles);

            const userPayload = {
                id: user.id,
                email: user.email,
                roles: roles //put roles as jwt payload
            };
            //{ id: user.id, email: user.email, roles: roles }
            const accessToken = jwt.sign(userPayload, process.env.JWTTOKEN, {expiresIn: '20s'});

            let option = {
                maxAge: 15 * 24 * 60 * 60 * 1000, // would expire after 15 days
                httpOnly: true, // The cookie only accessible by the web server
            };  
            //{ id: user.id, email: user.email, roles: roles }
            const refresh = jwt.sign(userPayload, "refreshtoken", {expiresIn: '5d'});
            
            res.cookie("refreshtoken", refresh, option);
            return res.status(200).json({ id: user.id, username: user.username, token: accessToken, Roles: roles });
        } catch (error) {
            console.error(error);
        }
    }

    async findById(req, res){
        const id = req.params.id;
        const user = await userservice.userIdFinding(id);
        return res.status(200).json(user);
    }

     RefreshToken(req, res){
        try {
            const refreshtoken = req.cookies.refreshtoken;
        if(refreshtoken == null){
            console.log("Tidak ada cookie");
            return res.status(400).send({message:"refresh token tidak ada!!!!"});
        }
        jwt.verify(refreshtoken, "refreshtoken", (err, decoded) => {
            if(err) return res.status(err).send({message: "ada error"});

            const userPayload = {
                id: decoded.id,
                email: decoded.email,
                roles: decoded.roles,
            };
            console.log("Dalam refresh token method: " + decoded.roles);
            console.log("Refresh Token Method ==>>> REGISTERED USER ID AND EMAIL IS: " + userPayload.id + " -- " + userPayload.email + " dan perannya: " + userPayload.roles);
            const newAccessToken = jwt.sign(userPayload, process.env.JWTTOKEN, {expiresIn: '20s'});
            return res.send(newAccessToken);
        });
        
        } catch (error) {
            console.log(error);
        }
    }

    Logout(req, res){
        try {
        const refreshtoken = req.cookies.refreshtoken;
        if(!refreshtoken){
            return res.status(401).json({status: 'Cannot log out'});
        }
        console.log("refreshtoken is when logging out is: " + refreshtoken);
        res.clearCookie(refreshtoken);
        return res.sendStatus(200);
        } catch (error) {
            console.log(error);
        }
    }

    async updateUserName(req, res){
        try {
        const id = req.params.id;
        const {username} = req.body;
        const user = await userservice.updateProfile(id, username);
        return res.status(200).send(user.username + " has been just updated");
        } catch (error) {
            console.log(`error is ${error}`);
            res.status(400).send(error.message);
        }
    }


    async activateUser(req, res){
        try {
            const userId = req.userToken.UserId;
            console.log(typeof userId);
            
            if(userId === undefined){
                return res.status(500).json({message: 'id is undefined'});
            }
            console.log(`value of id is: ${userId}`);

            await userservice.activateUser(userId);
            res.status(200).send({message: 'your account is now activated'});
        } catch (error) {
            console.log(error.message, "in user controller");
            res.status(400).send(error.message);
        }
    }


    getUserIdByJwtMiddleware(req, res){
        const userid = req.id;
        console.log(userid);
        return res.status(200).send(`userid: ${userid}`);
    }

    
}

    


module.exports = new UserController();