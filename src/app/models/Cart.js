const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  _id: { type: String },
  items: [
    {
      _id: { type: String },
      name: { type: String },
      price: { type: Number },
      image: { type: String },
    },
  ],
  total: { type: Number },
});

module.exports = mongoose.model("Cart", cartSchema);
