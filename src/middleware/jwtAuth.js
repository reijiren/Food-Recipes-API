const { jwt_secret } = require('../helper/env');
const jwt = require('jsonwebtoken');
const { failed } = require('../helper/response');

module.exports = (req, res, next) => {
    //try catch
    try{
        const { token } = req.headers;
        const decode = jwt.verify(token, jwt_secret);
        // console.log(decode);
        // next();

        req.APP_DATA = {
            tokenDecode: decode,
        }
        
        next();
    } catch(err){
        failed(res, err, 'failed', 'Invalid token');
    }

    //callback
    // const {token} = req.headers;
    // jwt.verify(token, jwt_secret, (err, decode) => {
    //     if(err){
    //         failed(res, err, 'failed', 'Invalid token');
    //     }else{
    //         next();
    //     }
    // })
}