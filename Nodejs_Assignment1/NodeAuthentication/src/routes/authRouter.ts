const {createUser,login,token} = require("../controller/authController");
const {checkToken,refreshToken} =require("../middleware/tokenValidation");


const router = require("express").Router();

router.post("/",checkToken,createUser);
router.post("/login",login);
router.post("/token",refreshToken);
module.exports = router;
