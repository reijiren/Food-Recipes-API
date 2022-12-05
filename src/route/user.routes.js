const express = require("express");
const { list, detail, update, destroy, listPaged, deleteImg, updateImg } = require("../controller/user.controller");
const { register, login, checkEmail } = require('../controller/auth.controller');

const router = express.Router();

const jwtAuth = require('../middleware/jwtAuth');
const { isAdmin } = require('../middleware/authorization');
const uploadPP = require('../middleware/uploadProfilePic');
const deleteProfileImg = require('../middleware/deleteProfilePic');

router
.get("/users", list)
.get("/user/:page", listPaged)
.get("/user/detail/:id", isAdmin, detail)
.put("/user/:id", update)
.put("/user/changeimg/:id", uploadPP, deleteProfileImg, updateImg)
.delete("/user/:id", isAdmin, deleteProfileImg, destroy)
.get("/email/:email", checkEmail)
.post('/user/register', register)
.post('/user/login', login);

module.exports = router;