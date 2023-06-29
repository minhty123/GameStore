const express = require("express");
const router = express.Router();

const cartController = require("../app/controllers/CartController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRole = require("../middlewares/verifyRole");
const ROLE_LIST = require("../app/models/Role_list");

router.get(
  "/show",
  verifyToken,
  verifyRole(ROLE_LIST.User),
  cartController.show
);

router.post("/games/:slug", verifyToken, cartController.AddToCart);

module.exports = router;
