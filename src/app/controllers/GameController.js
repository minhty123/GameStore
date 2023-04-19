const Game = require("../models/Game");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
const Category = require("../models/Category");

class GameController {
  //[GET] /games/:slug
  show(req, res, next) {
    Game.findOne({ slug: req.params.slug })
      .then((game) => {
        res.render("game/show", {
          game: mongooseToObject(game),
        });
      })
      .catch(next);
  }
  //[GET] /games/create
  create(req, res, next) {
    Category.find({})
      .then((category) => {
        res.render("game/create", {
          category: mutipleMongooseToObject(category),
        });
      })
      .catch(next);
    // res.render("game/create");
  }

  //[POST] /games/store
  store(req, res, next) {
    const game = new Game(req.body);
    game.save().then(() => res.redirect("/save/stored/games"));
  }
  //[GET] /games/:id/edit
  edit(req, res, next) {
    Promise.all([Game.findById(req.params.id), Category.find({})])
      .then(([game, category]) =>
        res.render("game/edit", {
          game: mongooseToObject(game),
          category: mutipleMongooseToObject(category),
        })
      )
      .catch(next);
  }
  //[PUT] /games/:id
  update(req, res, next) {
    Game.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/save/stored/games"))
      .catch(next);
  }
  //[DELETE] /games/:id
  delete(req, res, next) {
    Game.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /games/:id/force
  forceDelete(req, res, next) {
    Game.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[PATCH] /games/:id/restore
  restore(req, res, next) {
    Game.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[POST] /games/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Game.delete({ _id: { $in: req.body.gameIds } }) //handle array
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Invalid" });
    }
  }
  //[POST] /games/handle-form-actions
  handleTrashActions(req, res, next) {
    switch (req.body.action) {
      case "restore":
        Game.restore({ _id: { $in: req.body.gameIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      case "delete":
        Game.deleteMany({ _id: { $in: req.body.gameIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Invalid" });
    }
  }
}

module.exports = new GameController();
