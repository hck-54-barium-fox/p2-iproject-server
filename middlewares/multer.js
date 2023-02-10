const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        let currentTime = new Date().getTime();
        cb(null, `${file.originalname}-${currentTime}.png`)
    }
})

const upload = multer({storage: storage})

module.exports = upload