const fs = require("fs");
const recipeModel = require("../model/recipe.model");

const removeRecipeImg = async (req, res, next) => {
  const id = req.params.id;
  const data = await recipeModel.recipeDetail(id);
  if (data.rows[0]) {
    const img = data.rows[0].recipeimg;
    if(img !== "null.jpg"){
      fs.unlink(`./assets/recipes/${img}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    next();
  } else {
    res.json('Recipe not found');
  }
};

module.exports = removeRecipeImg;