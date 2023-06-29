const Game = require("../models/Game");
const User = require("../models/User");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
const Category = require("../models/Category");

class SiteController {
  //[GET] /
  home(req, res, next) {
    Promise.all([
      Game.find({}).sort({ createdAt: -1 }).limit(8),
      Category.find({}),
      Game.find({ Type: "Việt hóa" }).sort({ createdAt: -1 }).limit(8),
      Game.find({}).sort({ createdAt: -1 }).limit(2),
      User.findById(req.user._id),
    ])
      .then(([game, categorys, gamevh, gamebn, user]) => {
        res.render("home", {
          game: mutipleMongooseToObject(game),
          categorys: mutipleMongooseToObject(categorys),
          gamevh: mutipleMongooseToObject(gamevh),
          gamebn: mutipleMongooseToObject(gamebn),
          user: mongooseToObject(user),
        });
      })
      .catch(next);
  }
  //GET /category
  category(req, res, next) {
    const searchQuery = req.query.search || ""; // Lấy giá trị tìm kiếm từ query parameters

    const gameSearchPromise = Game.find({
      name: { $regex: searchQuery, $options: "i" },
    })
      .sort({ createdAt: -1 })
      .exec(); // Tìm kiếm game theo tên
    Promise.all([
      gameSearchPromise,
      Category.find({}),
      User.findById(req.user._id),
    ])
      .then(([game, categorys, user]) => {
        res.render("category", {
          game: mutipleMongooseToObject(game),
          categorys: mutipleMongooseToObject(categorys),
          user: mongooseToObject(user),
        });
      })
      .catch(next);
  }
  //GET /category/:Type
  categoryOfGames(req, res, next) {
    const categoryType = req.params.Type;
    Category.findOne({ name: categoryType })
      .then((category) => {
        if (category) {
          Promise.all([
            Game.find({ Type: category.name }),
            Category.find({}),
            Category.findOne({ name: categoryType }),
            User.findById(req.user._id),
          ])
            .then(([game, categorys, category, user]) => {
              res.render("category", {
                game: mutipleMongooseToObject(game),
                categorys: mutipleMongooseToObject(categorys),
                category: mongooseToObject(category),
                user: mongooseToObject(user),
              });
            })
            .catch(next);
        } else {
          res.render("category", {
            game: [],
            category: mutipleMongooseToObject(category),
          });
        }
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
