const Game = require("../models/Game");
const User = require("../models/User");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");

class SaveController {
  //[GET] /save/stored/games
  storedGames(req, res, next) {
    Promise.all([
      Game.find({}),
      Game.countDocumentsDeleted(),
      User.findById(req.user._id),
    ])
      .then(([game, deleteCount, user]) => {
        res.render("save/storedGames", {
          deleteCount,
          game: mutipleMongooseToObject(game),
          user: mongooseToObject(user),
        });
      })
      .catch(next);
  }

  //[GET] /save/trash/games
  trashGames(req, res, next) {
    Promise.all([Game.findDeleted({}), User.findById(req.user._id)])
      .then(([game, user]) =>
        res.render("save/trashGames", {
          game: mutipleMongooseToObject(game),
          user: mongooseToObject(user),
        })
      )
      .catch(next);
  }
}

module.exports = new SaveController();
