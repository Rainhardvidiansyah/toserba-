const {registrationSchema, loginSchema} = require('../utils/uservalidator');


const validateRegistrationMiddleware = (req, res, next) =>{
    const {error} = registrationSchema.validate(req.body);
    if(error){
        res.status(400).json({message: error.message});
    }
    next();  
};

const validateLoginMiddleware = (req, res, next) => {
  const {error} = loginSchema.validate(req.body);
  if(error){
    res.status(400).json({message: error.message});
  }
  else{
    next();  
  }
};


module.exports = {validateRegistrationMiddleware, validateLoginMiddleware};