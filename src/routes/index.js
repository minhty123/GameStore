const siteRouter = require("./site");
const gameRouter = require("./games");
const saveRouter = require("./save");
// const auth= require('./auth')

route = (app) => {
  app.use("/games", gameRouter);
  app.use("/save", saveRouter);
  // app.use('/auth', auth)
  app.use("/", siteRouter);
  // app.post('/search', (req, res) => {
  //     console.log(req.body)
  //     res.send('')
  //   })
};

module.exports = route;
