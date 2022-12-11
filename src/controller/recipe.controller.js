const recipeModel = require("../model/recipe.model");
const cloudinary = require('../helper/cloudinary');
const { success, failed } = require('../helper/response');

const recipeController = {
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
        const title = req.query.title;
        const sort = req.query.sort;
        const asc = req.query.asc;

        recipeModel.findRecipesPaged(title, page, sort, asc)
        .then((result) => {
            success(res, result.rows, 'success', 'Get recipes success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get recipes failed')
        });
    },
    find: (req, res) => {
        const { title } = req.body;

        recipeModel.findRecipe(title)
        .then((result) => {
            success(res, result.rows, 'success', 'Find recipe success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Find recipe failed')
        });
    },
    detail: (req, res) => {
        const id = req.params.id;

        recipeModel.recipeDetail(id)
        .then((result) => {
            success(res, result.rows, 'success', 'Get detailed recipe success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get detailed recipe failed')
        });
    },
    listOwned: (req, res) => {
        const id = req.params.id;

        recipeModel.listOwnedRecipes(id)
        .then((result) => {
            success(res, result.rows, 'success', 'Get recipe owned list success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get recipe owned list failed')
        });
    },
    listLiked: (req, res) => {
        const id = req.params.id;

        recipeModel.listLikedRecipes(id)
        .then((result) => {
            success(res, result.rows, 'success', 'Get recipe liked list success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get recipe liked list failed')
        });
    },
    listSaved: (req, res) => {
        const id = req.params.id;

        recipeModel.listSavedRecipes(id)
        .then((result) => {
            success(res, result.rows, 'success', 'Get recipe saved list success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get recipe saved list failed')
        });
    },
    insert: async(req, res) => {
        try{
            const { title, ingredient, owner } = await req.body;
            const image = await cloudinary.uploader.upload(req.file.path) || {secure_url: "https://res.cloudinary.com/dmkviiqax/image/upload/v1670740075/null_jxiqhn.jpg", public_id: ""};

            const data = {
                title,
                ingredient,
                owner,
                image: `${image.secure_url}|&&|${image.public_id}`,
            }

            recipeModel.insertRecipe(data)
            .then((result) => {
                success(res, result.rowCount, 'success', 'Insert Success')
            }).catch((err) => {
                failed(res, err.message, 'failed', 'Insert failed')
            })
        }catch(err){
            failed(res, err.message, 'failed', 'Internal Server Error')
        }
    },
    update: (req, res) => {
        const id = req.params.id;
        const { title, ingredient } = req.body;

        const data = {
            id,
            title,
            ingredient
        };

        recipeModel.updateRecipe(data)
        .then((result) => {
            recipeModel.recipeDetail(id)
            .then((result) => {
                success(res, result.rows, 'success', 'Update recipe success')
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'Get detailed recipe failed')
            });
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update recipe failed')
        });
    },
    updateImg: async(req, res) => {
        const id = req.params.id;
        const image = await cloudinary.uploader.upload(req.file.path);

        const data = {
            id,
            image: `${image.secure_url}|&&|${image.public_id}`,
        };

        recipeModel.updateRecipe(data)
        .then((result) => {
            recipeModel.recipeDetail(id)
            .then((result) => {
                success(res, result.rows, 'success', 'Update recipe image success')
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'Get detailed recipe failed')
            });
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update recipe image failed')
        });
    },
    destroy: (req, res) => {
        const id = req.params.id;
        recipeModel.deleteRecipe(id)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Delete recipe success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete recipe failed')
        });
    },
}

module.exports = recipeController;