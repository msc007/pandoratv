const ENV = process.env.NODE_ENV || 'dev';
const express = require('express');
const helmet = require('helmet');
const validator = require('validator');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const rateLimit = require('express-rate-limit');
const app = express();
// Modal Schema
const Link = require('./models/Link');
const UserLink = require('./models/UserLink');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

/****** MIDDLEWARE*******/
if( ENV === 'production') {
  console.log('Production Environment');
  const cors = require('cors');
  app.use(cors({ origin: 'https://pandoratv.cf' }));
}
app.use(helmet());  // For security: consider csurf package later on
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/****** RATE LIMIT******/
const addLinkLimiter = rateLimit({
  // status code 429 will be returned when 'max' exceeded
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { limitErrorMessage: 'Too many request made from this IP, please try again after 1 hour' },
});
const bugReportLimiter = rateLimit({
  // status code 429 will be returned when 'max' exceeded
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { limitErrorMessage: 'Too many request made from this IP, please try again after 1 hour' },
});

/****** DB CONNECTION *******/
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Failed to connect: ', err));

/****** RESTful APIs *******/
// Get replies
app.get('/api/replies/:commentId', async (req,res) => {

  try {
    const comments = await Comment.find({ parentId: req.params.commentId }).sort({date: 1});
    res.status(200).json({ comments: comments });
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }
});
// Get only comments; no replies
app.get('/api/comments/:postId', async (req,res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId, parentId: null }).sort({date: 1});
    //console.log(comments);
    res.status(200).json({ comments: comments });
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }
});
// Post comments
app.post('/api/comments', async (req, res) => {
  try {
    const comment = new Comment({
      postId: req.body.postId,
      parentId: req.body.parentId,
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
// POST
app.get('/api/posts/:postId', async (req, res) => {
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
app.get('/api/trending/:pageNumber', async (req, res) => {
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
// LIVETV
app.get('/api/links/livetv', async (req, res) => {
  try {
    const links = await Link.find({ category: 'livetv' }).sort({ hits: -1 });
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// LIVESPORTS
app.get('/api/links/livesports', async (req, res) => {
  try {
    const links = await Link.find({ category: 'sports' }).sort({ hits: -1 });
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// WEBHARD
app.get('/api/links/webhard', async (req, res) => {
  try {
    const links = await Link.find({ category: 'webhard' }).sort({ hits: -1 });
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// COMMUNITY
app.get('/api/links/community', async (req, res) => {
  try {
    const links = await Link.find({ category: 'community' }).sort({ hits: -1 });
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// Home
app.get('/api/links/home', async (req, res) => {
  try {
    const links = await Link.find().sort({ hits: -1 }).limit(12);
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// USER ADDED LINKS
app.get('/api/links/user', async (req, res) => {
  try {
    const links = await UserLink.find().sort({hits: -1});
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
app.post('/api/links/user', addLinkLimiter, async (req, res) => {
  try {
    // Serverside input validation
    if(!validator.isURL(req.body.siteLink, { require_tld: true, require_protocol: true }) ||
       !validator.isLength(req.body.siteName, { min:1, max: 20 }) ||
       !validator.isLength(req.body.siteDescription, { min:1, max: 30 })) {
       return res.status(200).json({ validationMessage: '잘못된 양식입니다, 양식에 맞춰 다시 작성해주세요!' })
    }
    // Creating model to be saved
    let newUserLink = new UserLink({
      name: req.body.siteName,
      link: req.body.siteLink,
      description: req.body.siteDescription,
      category: 'test',
      hits: 0
    });
    // Insert new link to DB
    let saveLink = await newUserLink.save();
    // Send response on successful save
    if(saveLink) {
      res.status(200).json({ row: saveLink });
    }
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// Increment view count for user added sites
app.patch('/api/links/user/views/:siteId', async (req, res) => {
  try {
    await UserLink.findByIdAndUpdate({ _id: req.params.siteId }, { $inc: { hits: 1} });
    res.status(200).json();
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// Increment view count of sites
app.patch('/api/links/views/:siteId', async (req, res) => {
  try {
    await Link.findByIdAndUpdate({ _id: req.params.siteId }, { $inc: { hits: 1} });
    res.status(200).json();
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// Increment bug count of User sites
app.patch('/api/links/bug/:siteId', bugReportLimiter, async (req, res) => {
  try {
    // TODO: Consider merge UserLink and Link model
    const data = await Link.findByIdAndUpdate({ _id: req.params.siteId }, { $inc: { bugCount: 1} });
    //If it's not from link update UserLink
    if(!data)
      await UserLink.findByIdAndUpdate({ _id: req.params.siteId }, { $inc: { bugCount: 1} });

    res.status(200).json();
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});

/*
function main(){
  Post.updateMany({}, { $set: {comments: []} }, {upsert: true }).then((res,err) =>{
    console.log(res);
  });
}
main();
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${ PORT }`));