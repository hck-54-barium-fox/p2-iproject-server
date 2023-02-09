const router = require('express').Router()
const routerCustomer = require("./customer")
const routerProduct = require("./product")
const routerBookmark = require("./bookmark")

router.get("/", (req, res) => {
    res.send("server is up")
})
router.use("/customers", routerCustomer)
router.use("/products", routerProduct)
router.use("/bookmarks", routerBookmark)

module.exports = router