const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
const app = express();
const Link = require('./models/Link');

const ENV = process.env.NODE_ENV || 'dev';

if( ENV === 'production') {
  console.log('Production Environment');
  const cors = require('cors');
  app.use(cors({origin: 'https://pandoratv.cf'}));
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Failed to connect: ', err));


function createData(name, link, description, language, hits) {
  return { name, link, description, language, hits };
}

// link must start with http or https
const liveSportsRows = [
  createData('neneTV', 'http://www.nene365.com', '종합 스포츠 중계 사이트', '한국어', 100),
  createData('spoTV', 'http://www.spotv365.com', '종합 스포츠 중계 사이트', '한국어', 100),
  createData('만수TV', 'http://www.mstv24.com', '종합 스포츠 중계 사이트', '한국어', 100),
  createData('coolTV', 'http://www.cool-365.com', '종합 스포츠 중계 사이트', '한국어', 100),
  createData('bestTV', 'http://www.besttv365.com', '종합 스포츠 중계 사이트', '한국어', 100),
];

const webHardRows = [
  createData('한인디스크', 'http://www.hanindisk.com', '미주 한인 웹하드', '한국어', 100),
  createData('키위디스크', 'http://www.kiwidisk.com', '미주 한인 웹하드', '한국어', 100),
  createData('USA디스크', 'http://www.usadisk.com', '미주 한인 웹하드', '한국어', 100),
];

const communityRows = [
    createData('라디오코리아', 'http://www.radioKorea.com', '미주 한입 종합 커뮤니티', '한국어', 100),
    createData('미씨USA', 'http://www.missyusa.com', '미주 최대 여성 커뮤니티', '한국어', 100),
    createData('미즈빌', 'http://www.mizville.org', '미주 여성 커뮤니티', '한국어', 100),
    createData('미씨쿠폰', 'http://www.missycoupons.com', '미주 각종 활인 정보', '한국어', 100),
    createData('중앙일보', 'http://www.koreadaily.com', '미주 중앙일보', '한국어', 100),
    createData('한국일보', 'http://www.koreatimes.com', '미주 한국일보', '한국어', 100),
];

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
    res.status(500).json({message: err.message});
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
    res.status(500).json({message: err.message});
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
    res.status(500).json({message: err.message});
  }  
});

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);