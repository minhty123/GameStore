const express = require("express");
const router = express.Router();

const gamesController = require("../app/controllers/GameController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRole = require("../middlewares/verifyRole");
const ROLE_LIST = require("../app/models/Role_list");

router.get(
  "/create",
  verifyToken,
  verifyRole(ROLE_LIST.Admin),
  gamesController.create
);
router.post("/store", gamesController.store);
router.get(
  "/:id/edit",
  verifyToken,
  verifyRole(ROLE_LIST.Admin),
  gamesController.edit
);
router.post("/handle-form-actions", gamesController.handleFormActions);
router.post("/handle-trash-actions", gamesController.handleTrashActions);
router.put("/:id", gamesController.update);
router.patch("/:id/restore", gamesController.restore);
router.delete("/:id", gamesController.delete);
router.delete("/:id/force", gamesController.forceDelete);
router.get("/:slug", verifyToken, gamesController.show);

module.exports = router;
