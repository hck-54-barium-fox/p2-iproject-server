const express = require('express')
const ControllerCust = require('../controllers/custController')
const router = express.Router()
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');

cloudinary.config({
    cloud_name: "drl5t8wsr",
    api_key: "275441513539424",
    api_secret: "CVuq9oYTIyYbmCHIVZ8vb6ugj4k",
});
  
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "RentOPhone",
    },
});
const upload = multer({ storage: storage });

router.post('/register', upload.single("image"), ControllerCust.register)
router.post('/login', ControllerCust.login)
router.post("/googleSignIn", ControllerCust.googleSignIn);



module.exports = router