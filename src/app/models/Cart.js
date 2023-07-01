const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  _id: { type: String },
  items: [
    {
      id: { type: String },
      name: { type: String },
      price: { type: Number },
      image: { type: String },
      link: { type: String },
    },
  ],
  total: { type: Number },
});

module.exports = mongoose.model("Cart", cartSchema);
