const BookmarkController = require("../controller/bookmarkController")
const router = require('express').Router()
const { custAuthentication } = require("../middleware/auth")

router.use(custAuthentication)
router.get("/", BookmarkController.getAllBookmark)
router.post("/checkout/:productId", BookmarkController.generateMidtrans)
router.patch("/checkout", BookmarkController.successPayment)

router.post("/:productId", BookmarkController.createBookmark)
router.delete("/:bookmarkId", BookmarkController.destroyBookmark)
router.get("/count", BookmarkController.countBookmark)



module.exports = router