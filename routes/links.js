const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Link = require('../models/Link');
const UserLink = require('../models/UserLink');
const helmet = require('helmet');
const validator = require('validator');

/****** RATE LIMIT ******/
const addLinkLimiter = rateLimit({
  // status code 429 will be returned when 'max' exceeded
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { limitErrorMessage: 'Too many request made from this IP, please try again after 1 hour' },
});
const bugReportLimiter = rateLimit({
  // status code 429 will be returned when 'max' exceeded
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: { limitErrorMessage: 'Too many request made from this IP, please try again after 1 hour' },
});

/******* GET REQUEST *******/
// LIVETV
router.get('/livetv', async (req, res) => {
  try {
    const links = await Link.find({ category: 'livetv' }).sort({ hits: -1 });
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// LIVESPORTS
router.get('/livesports', async (req, res) => {
  try {
    const links = await Link.find({ category: 'sports' }).sort({ hits: -1 });
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// WEBHARD
router.get('/webhard', async (req, res) => {
  try {
    const links = await Link.find({ category: 'webhard' }).sort({ hits: -1 });
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// COMMUNITY
router.get('/community', async (req, res) => {
  try {
    const links = await Link.find({ category: 'community' }).sort({ hits: -1 });
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// Home
router.get('/home', async (req, res) => {
  try {
    const links = await Link.find().sort({ hits: -1 }).limit(12);
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// USER ADDED LINKS
router.get('/user', async (req, res) => {
  try {
    const links = await UserLink.find().sort({hits: -1});
    res.json(links);
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});

/******* POST REQUEST *******/
router.post('/user', addLinkLimiter, async (req, res) => {
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

/******* PATCH REQUEST *******/
// Increment view count for user added sites
router.patch('/user/views/:siteId', async (req, res) => {
  try {
    await UserLink.findByIdAndUpdate({ _id: req.params.siteId }, { $inc: { hits: 1} });
    res.status(200).json();
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// Increment view count of sites
router.patch('/views/:siteId', async (req, res) => {
  try {
    await Link.findByIdAndUpdate({ _id: req.params.siteId }, { $inc: { hits: 1} });
    res.status(200).json();
  } catch(err) {
    res.status(500).json({ errorMessage: err.message });
  }  
});
// Increment bug count of User sites
router.patch('/bug/:siteId', bugReportLimiter, async (req, res) => {
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

module.exports = router;