const userModel = require('../model/user.model');
const { success, failed, successWithToken } = require('../helper/response');

const bcrypt = require('bcrypt');
const jwtToken = require('../helper/generateJWT');

module.exports = {
    register: (req, res) => {
        try{
            const { name, email, phone, password, level } = req.body;

            bcrypt.hash(password, 10, (err, hash) => {
                if(err){
                    failed(res, err.message, 'Failed', 'Hash Password Failed')
                }
                const data = {
                    name,
                    email,
                    phone,
                    password: hash,
                    level,
                    image: 'default.png',
                }

                userModel.checkEmail(email)
                .then((result) => {
                    if(result.rowCount === 0){
                        userModel.register(data)
                        .then((result) => {
                            success(res, result.rowCount, 'success', 'Register Success')
                        })
                        .catch((err) => {
                            failed(res, err.message, 'failed', 'Register Failed')
                        })
                    }else{
                        failed(res, null, 'failed', 'Email is already taken')
                    }
                })
                .catch((err) => {
                    failed(res, err.message, 'failed', 'Failed to check user email')
                })
                
            })
        }catch (err){
            console.log(err);
        }
    },

    login: (req, res) => {
        const { email, password } = req.body;

        userModel.checkEmail(email)
        .then((result) => {
            const user = result.rows[0];
            if(result.rowCount > 0){
                bcrypt.compare(password, user.password)
                .then(async(result) => {
                    if(result){
                        const token = await jwtToken({
                            email: user.email,
                            level: user.level,
                        })
                        successWithToken(res, user, token, 'success', 'Login Success');
                    }else{
                        failed(res, null, 'failed', 'Email or Password Incorrect')
                    }
                })
            }else{
                failed(res, null, 'failed', 'Email or Password Incorrect');
            }
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Internal server error');
        })
    }
}