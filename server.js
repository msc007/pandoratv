const ENV = process.env.NODE_ENV || 'dev';
const express = require('express');
const helmet = require('helmet');
const validator = require('validator');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
// Modal Schema
const Link = require('./models/Link');
const UserLink = require('./models/UserLink');
const Post = require('./models/Post');

/****** MIDDLEWARE*******/
if( ENV === 'production') {
  console.log('Production Environment');
  const cors = require('cors');
  app.use(cors({origin: 'https://pandoratv.cf'}));
}
app.use(helmet());  // For security: consider csurf package later on
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/****** DB CONNECTION *******/
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Failed to connect: ', err));

/****** RESTful APIs *******/
// POST
app.get('/api/posts/:postId', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate({ _id: req.params.postId }, { $inc: { hits: 1} }); // increment hits
    if(post) {
      res.json(post);
    }
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});
// TRENDING
app.get('/api/trending', async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ hits: -1 }); // Descending order
    res.json(posts);
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});

// LIVESPORTS
app.get('/api/links/livesports', async (req, res) => {
  try {
    const links = await Link.find({category: 'sports'});
    res.json(links);
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});
// WEBHARD
app.get('/api/links/webhard', async (req, res) => {
  try {
    const links = await Link.find({category: 'webhard'});
    res.json(links);
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});
// COMMUNITY
app.get('/api/links/community', async (req, res) => {
  try {
    const links = await Link.find({category: 'community'});
    res.json(links);
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});
// Home
app.get('/api/links/home', async (req, res) => {
  try {
    const links = await Link.find().sort({hits: -1});
    res.json(links);
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});
// USER ADDED LINKS
app.get('/api/links/user', async (req, res) => {
  try {
    const links = await UserLink.find().sort({hits: -1});
    res.json(links);
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});
app.post('/api/links/user', async (req, res) => {
  try {
    // Serverside input validation
    if(!validator.isURL(req.body.siteLink, {require_tld: true, require_protocol: true}) ||
       !validator.isLength(req.body.siteName, {min:1,max: 20}) ||
       !validator.isLength(req.body.siteDescription, {min:1, max: 30})) {
       return res.status(200).json({validationMessage: '잘못된 양식입니다, 양식에 맞춰 다시 작성해주세요!'})
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
      res.status(200).json({row: saveLink});
    }
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));