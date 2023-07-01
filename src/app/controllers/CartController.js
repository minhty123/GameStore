const Cart = require("../models/Cart");
const Game = require("../models/Game");
const User = require("../models/User");
const Category = require("../models/Category");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");

class CartController {
  //GET
  show(req, res, next) {
    Promise.all([
      Cart.findById(req.user._id),
      Category.find({}),
      User.findById(req.user._id),
    ])
      .then(([carts, categorys, user]) => {
        res.render("cart/show", {
          carts: mongooseToObject(carts),
          categorys: mutipleMongooseToObject(categorys),
          user: mongooseToObject(user),
          cart: carts === null ? 0 : carts.items.length,
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
          link: game.Filedl,
        };
        if (cart) {
          cart.items.push(newItem);
          cart.total += newItem.price;
          cart.save();
          res.redirect("/cart/show");
        } else {
          const newCart = new Cart({
            _id: req.user._id,
            items: new Array(),
            total: newItem.price,
          });
          newCart.items.push(newItem);

          // cart = newCart;
          newCart.save();
          res.redirect("/cart/show");
        }
        // cart.save();
      })

      .catch(next);
  }
  async delete(req, res, next) {
    try {
      const cartId = req.user._id;
      const itemId = req.params.id;
      const cart = await Cart.findOne({ _id: cartId });

      if (!cart) {
        return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
      }
      const itemIndex = cart.items.findIndex(
        (item) => item.id.toString() === itemId.toString()
      );

      if (itemIndex === -1) {
        return res
          .status(404)
          .json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
      }

      const deletedItem = cart.items.splice(itemIndex, 1);
      cart.total -= parseInt(deletedItem[0].price, 10);

      await cart.save();

      res.redirect("/cart/show");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
