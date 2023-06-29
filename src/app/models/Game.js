const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Game = new Schema(
  {
    name: { type: String, default: "" },
    Publisher: { type: String, default: "" },
    Content: { type: String, default: "" },
    Release_date: { type: String, default: "" },
    Type: { type: [String], default: [] },
    Language: { type: [String], default: [] },
    Capacity: { type: String, default: "" },
    Configuration: { type: String, default: "" },
    Development: { type: String, default: "" },
    price: { type: Number, default: 0 },
    Filedl: { type: String, default: "" },
    Image: { type: String, default: "" },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

//add plugin
mongoose.plugin(slug);
Game.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Game", Game);
