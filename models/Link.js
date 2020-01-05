const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for a item
const LinkSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  link: String,
  desc: String,
  category: String,
  hits: Number,
});

/*
 * Note: Mongoose automatically looks for the plural, lowercased version of your model name.
 * i.e) Item -> items collection
 */
const Link = mongoose.model("Link", LinkSchema);

module.exports = Link;
