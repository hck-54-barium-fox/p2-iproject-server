const express = require("express");
const MemeController = require("../controllers/memeController");
const { authentication } = require("../middleware/auth");
const router = express();
const upload = require("../middleware/multer");

router.use(authentication);
router.get("/", MemeController.getAllMemes);
router.post("/", MemeController.postGenerateMeme);
router.post("/postMeme", MemeController.postMemeToDb);
router.post("/memeMulter", upload.single("meme"), MemeController.memeMulter);
router.get("/:memeId", MemeController.getMemeById);

module.exports = router;
