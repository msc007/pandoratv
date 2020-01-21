const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./Comment')

// Create schema for a item
const PostSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, auto: true},
  title: String,
  source: String,
  img_urls: [{type: String}],
  text: String,
  category: String,
  hits: Number,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

/*
 * Note: Mongoose automatically looks for the plural, lowercased version of your model name.
 * i.e) Item -> items collection
 */
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
