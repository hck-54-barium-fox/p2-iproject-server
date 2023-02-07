const express = require("express");
const PostController = require("../controllers/postController");
const { authentication } = require("../middleware/auth");
const router = express();

router.use(authentication);
router.get("/", PostController.getAllPost);
router.get("/:id", PostController.getPostById);
// router.post("/:id/like", PostController.postLike);

module.exports = router;
