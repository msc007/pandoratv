const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

/****** GET REQUEST ******/
// Get nested replies
router.get('/replies/:commentId', async (req,res) => {

  try {
    const comments = await Comment.find({ parentId: req.params.commentId }).sort({date: 1});
    res.status(200).json({ comments: comments });
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }
});
// Get only post comment
router.get('/:postId', async (req,res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId, parentId: null }).sort({date: 1});
    //console.log(comments);
    res.status(200).json({ comments: comments });
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }
});

/****** POST REQUEST ******/
// Post comments
router.post('/', async (req, res) => {
  try {
    const comment = new Comment({
      postId: req.body.postId,
      parentId: req.body.parentId,
      replyTo: req.body.replyTo,
      author: req.body.author,
      password: req.body.password,
      text: req.body.text,
      date: req.body.date,
    });
    const savedComment = await comment.save();
    if(savedComment) 
      res.status(200).json({ comment: savedComment});

  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }
});

module.exports = router;