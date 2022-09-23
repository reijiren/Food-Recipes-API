const fs = require("fs");
const recipeModel = require("../model/recipe.model");

const removeRecipeImg = async (req, res, next) => {
  const title = req.params.title;
  const data = await recipeModel.findRecipe(title);
  if (data.rows[0].image) {
    const img = data.rows[0].image;
    // console.log(img);
    fs.unlink(`./assets/recipes/${img}`, (err) => {
      if (err) {
        res.json({
            message: 'err',
            error: err,
        })
      }
    });
    next();
  } else {
    res.json('There is no image');
  }
};

module.exports = removeRecipeImg;