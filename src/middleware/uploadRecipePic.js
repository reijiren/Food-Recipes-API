//import multer
const multer = require('multer');
//import path
const path = require('path');

//untuk mengunggah file
const multerUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './assets/recipes');
        },
        filename: (req, file, cb) => {
            const name = path.basename(file.originalname);
            const ext = path.extname(file.originalname);
            const nameSplit = name.split(`${ext}`);
            // console.log(nameSplit);

            const fileName = nameSplit[0] + '-' + Date.now() + '' + ext;
            cb(null, fileName)
        }
    }),

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        // console.log(ext);
        if(ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext === '.jfif'){
            cb(null, true);
        }else{
            const error = {
                message: 'File type is not supported'
            }
            cb(error, false);
        }
    }
})

//untuk middleware
const uploadRecipePic = (req, res, next) => {
    const multerSingle = multerUpload.single('image');
    multerSingle(req, res, (err) => {
        if(err){
            res.json({
                message: 'err',
                error: err
            })
        }else{

            next();
        }
    })
}

module.exports = uploadRecipePic;