const express = require('express');
const validator = require('validator');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
// Modal Schema
const Link = require('./models/Link');
const UserLink = require('./models/UserLink');
const ENV = process.env.NODE_ENV || 'dev';

/****** MIDDLEWARE*******/
if( ENV === 'production') {
  console.log('Production Environment');
  const cors = require('cors');
  app.use(cors({origin: 'https://pandoratv.cf'}));
}
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/****** DB CONNECTION *******/
const db = process.env.MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Failed to connect: ', err));

/****** RESTful APIs *******/

// LIVESPORTS
app.get('/api/links/livesports', async (req, res) => {
  try {
    let sportsList = [];
    const links = await Link.find({category: 'sports'});
    for(link of links) {
      sportsList.push(link);
    }
    res.json(sportsList);
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});

// WEBHARD
app.get('/api/links/webhard', async (req, res) => {
  try {
    let webHardList = [];
    const links = await Link.find({category: 'webhard'});
    for(link of links) {
      webHardList.push(link);
    }
    res.json(webHardList);
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});

// COMMUNITY
app.get('/api/links/community', async (req, res) => {
  try {
    let communityList = [];
    const links = await Link.find({category: 'community'});
    for(link of links) {
      communityList.push(link);
    }
    res.json(communityList);
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});

// Home
app.get('/api/links/home', async (req, res) => {
  try {
    let homeList = [];
    const links = await Link.find().sort({hits: -1});
    for(link of links) {
      homeList.push(link);
    }
    res.json(homeList);
  } catch(err) {
    res.sendStatus(500).json({errorMessage: err.message});
  }  
});

// USER ADDED LINKS
app.get('/api/links/user', async (req, res) => {
  try {
    let userList = [];
    const links = await UserLink.find().sort({hits: -1});
    for(link of links) {
      userList.push(link);
    }
    res.json(userList);
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