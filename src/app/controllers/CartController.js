const Cart = require("../models/Cart");
const Game = require("../models/Game");
const User = require("../models/User");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");

class CartController {
  //GET
  show(req, res, next) {
    Cart.findById(req.user._id)
      .then((cart) => {
        res.render("cart/show", {
          cart: mongooseToObject(cart),
        });
      })
      .catch(next);
  }

  //POST cart/:_id
  AddToCart(req, res, next) {
    Promise.all([
      Cart.findOne({ _id: req.user._id }),
      Game.findOne({ slug: req.params.slug }),
    ])
      .then(([cart, game]) => {
        const newItem = {
          id: game._id,
          name: game.name,
          price: game.price,
          image: game.Image,
        };
        if (cart) {
          cart.items.push(newItem);
          cart.total += newItem.price;
          return cart.save();
        } else {
          const newCart = new Cart({
            _id: req.user._id,
            items: new Array(),
            total: newItem.price,
          });
          newCart.items.push(newItem);

          // cart = newCart;
          newCart.save();
        }
        // cart.save();
      })

      .catch(next);
  }
}

module.exports = new CartController();
