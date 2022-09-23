//declare express
const express = require("express");
const { list, detail, insert, update, destroy, listPaged, deleteImg, updateImg } = require("../controller/user.controller");
const { register, login } = require('../controller/auth.controller');

const router = express.Router();

const jwtAuth = require('../middleware/jwtAuth');
const { isAdmin, isCustomer } = require('../middleware/authorization');
const uploadPP = require('../middleware/uploadProfilePic');
const deleteProfileImg = require('../middleware/deleteProfilePic');

router
.get("/user", jwtAuth, isCustomer, list)
.get("/user/:page", jwtAuth, isCustomer, listPaged)
.get("/user/detail/:email",jwtAuth, isAdmin, detail)
.post("/user/", jwtAuth, insert)
.put("/user", jwtAuth, update)
.put("/user/:email/changeimg", jwtAuth, uploadPP, deleteProfileImg, updateImg)
.delete("/user/:email", jwtAuth, isAdmin, destroy)
.delete("/user/:email/deleteimg", jwtAuth, deleteProfileImg, deleteImg)

//register
.post('/user/register', uploadPP, register)
//login
.post('/user/login', login);

module.exports = router;