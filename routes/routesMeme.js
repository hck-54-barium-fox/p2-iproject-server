const express = require("express");
const MemeController = require("../controllers/memeController");
const { authentication } = require("../middleware/auth");
const router = express();

router.use(authentication);
router.get("/", MemeController.getAllMemes);
router.post("/", MemeController.postGenerateMeme);
router.get("/:memeId", MemeController.getMemeById);

module.exports = router;
