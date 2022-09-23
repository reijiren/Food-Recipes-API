// const { selectAll } = require("../model/user.model");
const recipeModel = require("../model/recipe.model");
const { success, failed } = require('../helper/response');

const recipeController = {
    //method
    list: (req, res) => {
        recipeModel.selectAllRecipes()
        .then((result) => {
            success(res, result.rows, 'success', 'Get all recipes success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get all recipes failed')
        });
    },
    listPaged: (req, res) => {
        const page = req.params.page;

        recipeModel.findRecipesPaged(page)
        .then((result) => {
            success(res, result.rows, 'success', 'Get recipes success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get recipes failed')
        });
    },
    listComment: (req, res) => {
        const page = req.params.page;
        const { id } = req.body;
        
        recipeModel.allRecipeComment(id, page)
        .then((result) => {
            success(res, result.rows, 'success', 'Get comments success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get comments failed')
        });
    },
    detail: (req, res) => {
        const title = req.params.title;

        recipeModel.findRecipe(title)
        .then((result) => {
            success(res, result.rows, 'success', 'Get detailed recipe success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get detailed recipe failed')
        });
    },
    insert: (req, res) => {
        try{
            //menangkap data dari body
            const { title, ingredient } = req.body;
            const image = req.file.filename;

            const data = {
                title,
                ingredient,
                image,
            }

            recipeModel.insertRecipe(data).then((result) => {
                success(res, result, 'success', 'Insert Success')
            }).catch((err) => {
                failed(res, err.message, 'failed', 'Insert failed')
            })
            
        }catch (err){
            console.log(err);
        }
    },
    update: (req, res) => {
        const { title, ingredient } = req.body;
        recipeModel.updateRecipe(title, ingredient)
        .then((result) => {
            success(res, result.rows, 'success', 'Update recipe success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update recipe failed')
        });
    },
    updateImg: (req, res) => {
        const title = req.params.title;
        const image = req.file.filename;
        recipeModel.changeRecipeImg(title, image)
        .then((result) => {
            success(res, result.rows, 'success', 'Update user picture success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update user picture failed')
        });
    },
    destroy: (req, res) => {
        const title = req.params.title;
        recipeModel.deleteRecipe(title)
        .then((result) => {
            success(res, result.rows, 'success', 'Delete recipe success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete recipe failed')
        });
    },
    deleteImg: (req, res) => {
        const title = req.params.title;

        recipeModel.deleteRecipeImg(title)
        .then((result) => {
            success(res, result.rows, 'success', 'Delete recipe success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete recipe failed')
        });
    }
}

module.exports = recipeController;