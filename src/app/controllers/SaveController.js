const Game = require("../models/Game");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class SaveController {
  //[GET] /save/stored/games
  storedGames(req, res, next) {
    Promise.all([Game.find({}), Game.countDocumentsDeleted()])
      .then(([game, deleteCount]) => {
        res.render("save/storedGames", {
          deleteCount,
          game: mutipleMongooseToObject(game),
        });
      })
      .catch(next);
  }

  //[GET] /save/trash/games
  trashGames(req, res, next) {
    Game.findDeleted({})
      .then((game) =>
        res.render("save/trashGames", {
          game: mutipleMongooseToObject(game),
        })
      )
      .catch(next);
  }
}

module.exports = new SaveController();
