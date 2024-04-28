const jwt = require('jsonwebtoken');
require('dotenv').config();



const jwtVerification = (req, res, next) => {
    try {
        const headers = req.headers['authorization'];
        const token = headers && headers.split(' ')[1];
        
        if(!token){
            return res.status(500).json({ error: "Token not found" });
        }
        
        jwt.verify(token, process.env.JWTTOKEN, (err, decoded) => {
            if(err){
                return res.status(403).json({message: "You are not authorized"});
            }
            //req.user = decoded; //later use this in req object such as req.user.id or req.user.email if you want to get user data specifically!
            
           
            req.roles = decoded.roles;
            req.id = decoded.id;
            req.email = decoded.email;

            console.log("Role dalam jwt middleware: " + req.roles);
            next();
        });
    } catch (error) {
        console.error(error);
    }};

   

module.exports = jwtVerification;