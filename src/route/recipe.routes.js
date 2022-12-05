//declare express
const express = require("express");
const { list, detail, insert, update, destroy, listPaged, listComment, deleteImg, updateImg, find } = require("../controller/recipe.controller");

const router = express.Router();

const jwtAuth = require('../middleware/jwtAuth');
const { isAdmin, isCustomer } = require('../middleware/authorization');
const uploadRP = require('../middleware/uploadRecipePic');
const deleteRecipeImg = require('../middleware/deleteRecipesPic');

router
.get("/recipes", jwtAuth, list)
.get("/recipes/:page", jwtAuth, listPaged)
.get("/recipe/:id", jwtAuth, detail)
.post("/recipe/find", jwtAuth, find)
.post("/recipe/insert", jwtAuth, isCustomer, uploadRP, insert)
.put("/recipe/:id", jwtAuth, update)
.put("/recipe/changeimg/:id", jwtAuth, uploadRP, deleteRecipeImg, updateImg)
.delete("/recipe/:id", jwtAuth, deleteRecipeImg, destroy);

module.exports = router;