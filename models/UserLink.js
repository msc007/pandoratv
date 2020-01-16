const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for a item
const UserLinkSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, auto: true},
  name: String,
  link: String,
  description: String,
  category: String,
  hits: Number,
});

/*
 * Note: Mongoose automatically looks for the plural, lowercased version of your model name.
 * i.e) Item -> items collection
 */
const UserLink = mongoose.model("UserLink", UserLinkSchema);

module.exports = UserLink;
