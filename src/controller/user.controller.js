const userModel = require("../model/user.model");
const bcrypt= require('bcrypt');
const cloudinary = require('../helper/cloudinary');
const { success, failed } = require('../helper/response');

const userController = {
    list: (req, res) => {
        userModel.selectAllUser()
        .then((result) => {
            success(res, result.rows, 'success', 'Get all user success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get all user failed')
        });
    },
    
    listPaged: (req, res) => {
        const page = req.params.page;
        const name = req.query.name;
        const sort = req.query.sort;
        const asc = req.query.asc;

        userModel.findUserPaged(name, page, sort, asc)
        .then((result) => {
            success(res, result.rows, 'success', 'Get user success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get user failed')
        });
    },

    detail: (req, res) => {
        const id = req.params.id;

        userModel.findUser(id)
        .then((result) => {
            success(res, result.rows, 'success', 'Get user detail success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get user detail failed')
        });
    },

    update: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const password = body.password ? bcrypt.hashSync(body.password, 10) : null;

        const data = {
            ...body,
            password,
            id
        }

        userModel.updateProfile(data)
        .then((result) => {
            userModel.findUser(id)
            .then((result) => {
                success(res, result.rows, 'success', 'Update user success')
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'Get user detail failed')
            })
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update user failed')
        });
    },

    updateImg: async(req, res) => {
        const id = await req.params.id;
        const image = await cloudinary.uploader.upload(req.file.path);
        console.log()
        const data = {
            id,
            image: `${image.secure_url}|&&|${image.public_id}`,
        }

        userModel.updateProfile(data)
        .then((result) => {
            userModel.findUser(id)
            .then((result) => {
                success(res, result.rows, 'success', 'Update user picture success')
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'Get user detail failed')
            })
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update user picture failed')
        });
    },

    destroy: (req, res) => {
        const id = req.params.id;

        userModel.deleteUser(id)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Delete user success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete user failed')
        });
    },

    addLike: (req, res) => {
        const body = req.body;

        userModel.insertLike(body)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Insert like success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Insert like failed')
        });
    },

    addSave: (req, res) => {
        const body = req.body;

        userModel.insertSave(body)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Insert save success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Insert save failed')
        });
    },

    removeLike: (req, res) => {
        const id = req.params.id;

        userModel.deleteLike(id)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Delete like success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete like failed')
        });
    },

    removeSave: (req, res) => {
        const id = req.params.id;

        userModel.deleteSave(id)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Delete save success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete save failed')
        });
    },
}

module.exports = userController;