const express = require('express');
const router = express.Router();

const userController = require('../controller/usercontroller');
const {validateRegistrationMiddleware, validateLoginMiddleware} = require('../middlewares/uservalidator.middlewares');



router.get("/public-api", function(req, res){
    res.send("This is a public API");
});

router.post('/auth/registration', validateRegistrationMiddleware, userController.registerUser);
router.post('/auth/login', validateLoginMiddleware, userController.Login);


module.exports = router;