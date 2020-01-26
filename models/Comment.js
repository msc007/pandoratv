const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for a item
const CommentSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  parentId: { type: Schema.Types.ObjectId, ref: 'Comment'},
  replyTo: String,
  author: String,
  password: String,
  text: String,
  date: Date,
});

/*
 * Note: Mongoose automatically looks for the plural, lowercased version of your model name.
 * i.e) Item -> items collection
 */
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
