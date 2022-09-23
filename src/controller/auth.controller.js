const userModel = require('../model/user.model');
const { success, failed, successWithToken } = require('../helper/response');

//declare bcrypt
const bcrypt = require('bcrypt');
const jwtToken = require('../helper/generateJWT');

module.exports = {
    register: (req, res) => {
        try{
            //menangkap data dari body
            const { name, email, phone, pw, level } = req.body;
            const image = req.file.filename;

            bcrypt.hash(pw, 10, (err, hash) => {
                if(err){
                    failed(res, err.message, 'Failed', 'Hash Password Failed')
                }
                //console.log(hash);
                const data = {
                    name,
                    email,
                    phone,
                    pw: hash,
                    level,
                    image,
                }

                userModel.register(data).then((result) => {
                    success(res, result, 'success', 'Register Success')
                }).catch((err) => {
                    failed(res, err.message, 'failed', 'register failed')
                })
            })
        }catch (err){
            console.log(err);
        }
    },

    login: (req, res) => {
        const { email, pw } = req.body;

        userModel.checkUsername(email)
        .then((result) => {
            // console.log(result.rows)
            const user = result.rows[0];
            if(result.rowCount > 0){
                bcrypt.compare(pw, result.rows[0].password)
                .then(async(result) => {
                    if(result){
                        const token = await jwtToken({
                            //username: user.username,
                            email: user.email,
                            level: user.level,
                        })
                        // console.log(token);
                        successWithToken(res, token, 'success', 'Login Success');
                    }else{
                        //ketika password salah
                        failed(res, null, 'failed', 'Email atau password salah')
                    }
                })
            }else{
                //ketika email salah
                failed(res, null, 'failed', 'Email atau password salah');
            }
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Internal server error');
        })
    }
}