const Cart = require("../models/Cart");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
class CartController {
  add(req, res, next) {
    Promise.all([
      Cart.findOne({ _id: req.users.id }),
      Game.findOne({ _id: req.param.id }),
    ])
      .then(([cart, game]) => {
        const newItem = {
          id: game._id,
          name: game.name,
          price: game.price,
        };
        if (cart) {
          cart.items.push(newItem);
          total += newItem.price;
        } else {
          const newCart = {
            _id: req.users.id,
            items: new Array(),
            total: newItem.price,
          };
          newCart.items.push(newItem);
          cart = newCart;
        }
        cart.save();
      })
      .catch(next);
  }
}
