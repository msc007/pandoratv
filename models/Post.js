const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for a item
const PostSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, auto: true},
  title: String,
  source: String,
  img_urls: [{type: String}],
  text: String,
  category: String,
  hits: Number,
});

/*
 * Note: Mongoose automatically looks for the plural, lowercased version of your model name.
 * i.e) Item -> items collection
 */
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
