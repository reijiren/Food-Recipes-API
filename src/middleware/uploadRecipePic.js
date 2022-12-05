const multer = require('multer');
const path = require('path');

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './assets/recipes');
        },
        filename: (req, file, cb) => {
            const name = path.basename(file.originalname);
            const ext = path.extname(file.originalname);
            const nameSplit = name.split(`${ext}`);

            const fileName = nameSplit[0] + '-' + Date.now() + '' + ext;
            cb(null, fileName)
        }
    }),

    limits:{
        fileSize: 2 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
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

const uploadRecipePic = (req, res, next) => {
    const multerSingle = multerUpload.single('image');
    multerSingle(req, res, (err) => {
        if(err){
            res.json({
                status: 'failed',
                message: 'upload recipe image failed',
                error: err
            })
        }else{
            next();
        }
    })
}

module.exports = uploadRecipePic;