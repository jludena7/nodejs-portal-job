const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

exports.config = () => {
    return {
        profile: {
            pathUp: __dirname + '/../../public/uploads/account/profile',
            pathDown: '/uploads/account/profile',
        }
    };
};

exports.defineActions = () => {
    return {
        limits : { fileSize : 100000 },
        storage: multer.diskStorage({
            destination : (req, file, cb) => {
                cb(null, this.config().profile.pathUp);
            },
            filename : (req, file, cb) => {
                const extension = file.mimetype.split('/')[1];
                const fileName = `${shortid.generate()}.${extension}`;
                req.newRealPath = this.config().profile.pathUp + '/' + fileName;
                cb(null, fileName);
            }
        }),
        fileFilter(req, file, cb) {
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
                cb(null, true);
            } else {
                cb(new Error('Invalid format'));
            }
        }
    };
};

exports.remove = (realPath) => {
     return unlinkAsync(realPath);
};