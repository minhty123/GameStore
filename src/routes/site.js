const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const verifyToken = require("../middlewares/verifyToken");

// router.get('/search', siteController.search)
router.get("/", verifyToken, siteController.home);
router.get("/category", verifyToken, siteController.category);
router.get("/category/:Type", verifyToken, siteController.categoryOfGames);

module.exports = router;
