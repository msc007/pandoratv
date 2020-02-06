const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cron = require('node-cron');
const dotenv = require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const Post = require('./models/Post');
const sanitizeHTML = require('sanitize-html');
const { uploadToS3 } = require('./aws-s3');
const { wait } = require('./utils');
const uuidv5 = require('uuid/v5');
const AWS_S3_BUCKET_URL = 'https://s3.us-east-2.amazonaws.com/images.pandoratv/';
const { clien_crawler } = require('./crawlers/clien');

// Set static public directory (for css/jquery/etc...)
// app.use(express.static(path.join(__dirname + '/public')));

// Middlewares for body-parser 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
const db = process.env.MONGO_URI;
mongoose
  .connect(db, {  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected for crawler'))
  .catch(err => console.log('Failed to connect: ', err));

//디씨 안됨
//http://mlbpark.donga.com/mp/best.php?b=bullpen&m=view 엠팍 가능
//루리웹 안됨
//https://www.fmkorea.com/ 24시간후 가능
//http://www.ppomppu.co.kr/hot.php?category=2&id=freeboard 가능
//https://www.clien.net/service/recommend 가능
//http://www.todayhumor.co.kr/board/list.php?table=bestofbest 가능
//http://www.slrclub.com/bbs/zboard.php?id=best_article 가능
//보배
//더쿠
//이토
//웃대

  /* NOTE ABOUT CRON:
  * Second(0-59)
  * Minute(0-59)
  * Hour(0-23)
  * Day(1-31)
  * Month(1-12)
  * Day of Week(0-7) 0 and 7 is sunday
  */

  // every 6 hour crawl
  //cron.schedule('0 0 */6 * * *', () => {
  //  time = new Date();
  //clien_crawler();
  //  console.log('\nScheduled task running every 6 hour at 0 second and 0 minute.');
  //});

clien_crawler();
//fmkorea_crawler();


//main();
//const PORT = process.env.CRAWLER_PORT;
//app.listen(PORT, () => console.log(`Crawler Server started on port ${PORT}`));

