const siteRouter = require("./site");
const gameRouter = require("./games");
const saveRouter = require("./save");
const authRouter = require("./auth");
const cartRouter = require("./cart");

route = (app) => {
  app.use("/games", gameRouter);
  app.use("/save", saveRouter);
  app.use("/auth", authRouter);
  app.use("/cart", cartRouter);
  app.use("/", siteRouter);
};

module.exports = route;
