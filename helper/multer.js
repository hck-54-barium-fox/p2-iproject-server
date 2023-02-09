const multer = require('multer')

const storage = multer.memoryStorage()

const multerIploads = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

module.exports = { multerIploads }