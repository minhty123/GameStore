const express = require("express");
const router = express.Router();

const saveController = require("../app/controllers/SaveController");

router.get("/stored/games", saveController.storedGames);
router.get("/trash/games", saveController.trashGames);

module.exports = router;
