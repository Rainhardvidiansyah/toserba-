const app = require('express');
const router = app.Router();

const userController = require('../controller/usercontroller');
const UserAddressController = require('../controller/useraddresscontroller');
const {roleForUser, updateUserNameMiddleware, validateUserAddressOwnership, validateUserActive, activateUserMiddleware} = require('../middlewares/usermiddlewares');
const jwtVerification = require('../middlewares/jwtmiddlewares');

// const auth = [];

const updatNameMiddleware = [jwtVerification, updateUserNameMiddleware];
const isUserActive = [jwtVerification, validateUserActive];


router.get('/auth/refreshtoken', userController.RefreshToken);
router.post('/auth/logout', userController.Logout);
router.put("/user/update/:id",  updatNameMiddleware, userController.updateUserName);
router.get("/user/all-id", jwtVerification, userController.getUserIdByJwtMiddleware);
router.get("/user/isactive", isUserActive, (req, res)=>{
    res.send("You are active user");
});

router.get("/test-path", (req, res) => {
    const path = req.path;
    res.send(path);
});



//activate user 
router.get("/user/activate", activateUserMiddleware, userController.activateUser);
//end of activate user



// START OF ADDRESS
router.post("/user/create-address", jwtVerification, UserAddressController.createUserAddress);
router.put("/user/update-address/:id", jwtVerification, validateUserAddressOwnership, UserAddressController.updateUserAddress);
router.delete("/user/delete-address/:id", jwtVerification, validateUserAddressOwnership, UserAddressController.deleteUserAddress);
// END OF ADDRESS

router.get('/router', jwtVerification, (req, res) => {
    console.log(req.id); //id who accessing this route
    console.log(req.email); // email who accessing this route. this is retrieved from middleware using req.email = decoded.email, take a look at the middleware jwtVerification!
    const user = {id: req.id, email:req.email, roles: req.roles};
    res.json(user);
});


router.get('/test', jwtVerification, roleForUser);



module.exports = router;