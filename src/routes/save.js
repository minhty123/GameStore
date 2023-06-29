const express = require("express");
const router = express.Router();

const saveController = require("../app/controllers/SaveController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRole = require("../middlewares/verifyRole");
const ROLE_LIST = require("../app/models/Role_list");

router.get(
  "/stored/games",
  verifyToken,
  verifyRole(ROLE_LIST.Admin),
  saveController.storedGames
);
router.get(
  "/trash/games",
  verifyToken,
  verifyRole(ROLE_LIST.Admin),
  saveController.trashGames
);

module.exports = router;
