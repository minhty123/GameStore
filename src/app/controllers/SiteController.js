const Game = require("../models/Game");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  //[GET] /
  home(req, res, next) {
    Game.find({})
      .then((game) => {
        res.render("home", {
          game: mutipleMongooseToObject(game),
        });
      })
      .catch(next);
  }
  // //[GET] /search
  // search(req, res){
  //     console.log(req.query.q)
  //     res.render('search')
  // }
}

module.exports = new SiteController();
