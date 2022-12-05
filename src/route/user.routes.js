const express = require("express");
const { list, detail, update, destroy, listPaged, deleteImg, updateImg } = require("../controller/user.controller");
const { register, login, checkEmail } = require('../controller/auth.controller');

const router = express.Router();

const jwtAuth = require('../middleware/jwtAuth');
const { isAdmin } = require('../middleware/authorization');
const uploadPP = require('../middleware/uploadProfilePic');
const deleteProfileImg = require('../middleware/deleteProfilePic');

router
.get("/users", jwtAuth, list)
.get("/user/:page", jwtAuth, listPaged)
.get("/user/detail/:id",jwtAuth, isAdmin, detail)
.put("/user/:id", jwtAuth, update)
.put("/user/changeimg/:id", jwtAuth, uploadPP, deleteProfileImg, updateImg)
.delete("/user/:id", jwtAuth, isAdmin, deleteProfileImg, destroy)
.get("/email/:email", checkEmail)
.post('/user/register', register)
.post('/user/login', login);

module.exports = router;