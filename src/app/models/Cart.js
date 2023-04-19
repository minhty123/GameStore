const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  _id: { type: String },
  items: [
    {
      name: { type: String },
      price: { type: Number },
    },
  ],
  total: { type: Number },
});

module.exports = mongoose.model("Cart", cartSchema);
