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
        },
        cv: {
            pathUp: __dirname + '/../../public/uploads/account/cv',
            pathDown: '/uploads/account/cv',
        }
    };
};

exports.defineActions = () => {
    return {
        profile: {
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
        },
        cv: {
            limits : { fileSize : 300000 },
            storage: multer.diskStorage({
                destination : (req, file, cb) => {
                    cb(null, this.config().cv.pathUp);
                },
                filename : (req, file, cb) => {
                    const extension = file.mimetype.split('/')[1];
                    const fileName = `${shortid.generate()}.${extension}`;
                    req.newRealPath = this.config().cv.pathUp + '/' + fileName;
                    cb(null, fileName);
                }
            }),
            fileFilter(req, file, cb) {
                if(file.mimetype === 'application/pdf' ) {
                    cb(null, true);
                } else {
                    cb(new Error('Invalid format'));
                }
            }
        }
    };
};

exports.remove = (realPath) => {
     return unlinkAsync(realPath);
};