const ProductController = require("../controller/productController")

const router = require('express').Router()

router.get("/", ProductController.getAllProduct)
router.get("/:id", ProductController.getProductById)


module.exports = router