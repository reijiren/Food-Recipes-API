//declare express
const express = require("express");
const { list, detail, insert, update, destroy, listPaged, listComment, deleteImg, updateImg } = require("../controller/recipe.controller");

const router = express.Router();

const jwtAuth = require('../middleware/jwtAuth');
const { isAdmin, isCustomer } = require('../middleware/authorization');
const uploadRP = require('../middleware/uploadRecipePic');
const deleteRecipeImg = require('../middleware/deleteRecipesPic');

router
.get("/recipe", jwtAuth, list)
.get("/recipe/:page", jwtAuth, listPaged)
.get("/recipe/detail/:title", jwtAuth, detail)
.get("/recipe/comment/:page", jwtAuth, listComment)
.post("/recipe/add", jwtAuth, uploadRP, insert)
.put("/recipe", jwtAuth, update)
.put("/recipe/:title/changeimg", jwtAuth, uploadRP, deleteRecipeImg, updateImg)
.delete("/recipe/:title", jwtAuth, destroy)
.delete("/recipe/:title/img", jwtAuth, deleteRecipeImg, deleteImg);

module.exports = router;