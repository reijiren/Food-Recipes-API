// const { selectAll } = require("../model/user.model");
const userModel = require("../model/user.model");
const { success, failed } = require('../helper/response');

const userController = {
    //method
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

        userModel.findUserPaged(page)
        .then((result) => {
            success(res, result.rows, 'success', 'Get user success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get user failed')
        });
    },
    detail: (req, res) => {
        const email = req.params.email;

        userModel.findUser(email)
        .then((result) => {
            success(res, result.rows, 'success', 'Get detailed user success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get detailed user failed')
        });
    },
    insert: (req, res) => {
        const { name, email, phone, pw } = req.body;
        userModel.insertUser(name, email, phone, pw)
        .then((result) => {
            success(res, result.rows, 'success', 'Insert user success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Insert user failed')
        });
    },
    update: (req, res) => {
        const { email, pw } = req.body;
        userModel.resetPassword(email, pw)
        .then((result) => {
            success(res, result.rows, 'success', 'Update user success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update user failed')
        });
    },
    updateImg: (req, res) => {
        const email = req.params.email;
        const image = req.file.filename;
        userModel.changeProfileImg(email, image)
        .then((result) => {
            success(res, result.rows, 'success', 'Update user picture success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update user picture failed')
        });
    },
    destroy: (req, res) => {
        const email = req.params.email;
        userModel.deleteUser(email)
        .then((result) => {
            success(res, result.rows, 'success', 'Delete user success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete user failed')
        });
    },
    deleteImg: (req, res) => {
        const email = req.params.email;

        userModel.deleteProfileImg(email)
        .then((result) => {
            success(res, result.rows, 'success', 'Delete profile picture success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete profile picture failed')
        });
    }
}

module.exports = userController;