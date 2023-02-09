const CustomerController = require("../controller/customerController")
const { multerIploads } = require("../helper/multer")
const { custAuthentication } = require("../middleware/auth")

const router = require('express').Router()

router.post("/register", CustomerController.register)
router.post("/login", CustomerController.login)
router.post("/ig-login", CustomerController.loginByFacebook)

router.use(custAuthentication)
router.get("/me", CustomerController.myProfile)
router.put("/me", multerIploads.single('address'), CustomerController.updateProfile)

module.exports = router