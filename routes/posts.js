const validator = require('validator');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/****** GET REQUEST ******/
// CONTENT PAGE
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate({ _id: req.params.postId }, { $inc: { hits: 1} }); // increment hits
    if(post) {
      res.json(post);
    }
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// TRENDING
router.get('/trending/:pageNumber', async (req, res) => {
  try {
    const perPage = 16;
    const pageNumber = req.params.pageNumber;
    //TODO need to find better algorithm to sort
    //const posts = await Post.find({}).sort({created_at: -1, hits: -1 }); // hits by descending order && newest
    const posts = await Post.find({}).sort({created_at: -1, hits: -1 }).limit(16).skip(perPage * pageNumber);
    res.json(posts);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});

module.exports = router;