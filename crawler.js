const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const cron = require('node-cron');
const dotenv = require('dotenv').config();
const Post = require('./models/Post');
const sanitizeHTML = require('sanitize-html')

// Set static public directory (for css/jquery/etc...)
// app.use(express.static(path.join(__dirname + '/public')));

// Middlewares for body-parser 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
const db = process.env.MONGO_URI
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

//clien_crawler();
// CLIEN
async function clien_crawler() {
  try {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
      + 'Chrome/75.0.3770.100 Safari/537.36';

    const domain = "https://www.clien.net/service/recommend";
    const response = await axios.get(domain, {
      withCredentials: true,
      headers: {
        'User-Agent': userAgent,
        Cookie: "CDNSEC=e19a50f57ff50fc4b8485dd88ef59115;",  // To avoid crawling detection
      }
    });

    if(response.status === 200) {
      const rawHTML = response.data;
      const $ = cheerio.load(rawHTML);
      let urls= [];
      // Scrape all the links
      const post_list = $('div.recommend_underList').children('div').each(function() {
        let titleLength = $(this).find('div.list_title').children().length;
        let post_hit = $(this).find('div.list_hit').text().trim();
        //if hit format uses k, convert it to number
        if(post_hit.includes('k')) {
          post_hit = post_hit.replace(' k','').replace('.','');
          post_hit *= 100;
        }
        // Add to list only if hit is > x and has image
        if(post_hit > 30000 && titleLength === 3) {
          const post_url = 'https://www.clien.net' + $(this).find('a.list_subject').attr('href').replace('?type=recommend','');
          urls.push(post_url);
        }
      })

      // Visit each url for crawling
      for(url of urls) {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': userAgent,
            Cookie: "CDNSEC=e19a50f57ff50fc4b8485dd88ef59115;",  // To avoid Clien crawling detection
          }
        });

        if(response.status === 200) {
          const rawHTML = response.data;
          const $ = cheerio.load(rawHTML);
          const hasCategory = $('h3.post_subject').children('span').length == 2 ? true : false;
          const title = hasCategory ? $('#div_content > div.post_title.symph_row > h3 > span:nth-child(2)').text().trim() : $('#div_content > div.post_title.symph_row > h3 > span').text().trim(); 
          const img_urls = [];
          let text = "";
          // Sanitize content HTML
          const content = sanitizeHTML($('#div_content > div.post_view > div.post_content > article > div'), {
            allowedTags: ['img', 'video', 'p', 'div', 'a', 'source'],
            allowedAttributes: {
              'img': ['src', 'alt', 'width', 'height', 'display', 'style'],
              'a': ['href', 'target', 'rel'],
              'video': ['poster', 'autoplay', 'loop', 'preload', 'width', 'height', 'playsinline', 'muted', 'display', 'style'],
              'source': ['src', 'type'],
            },
            allowedIframeHostnames: ['www.youtube.com'],
            exclusiveFilter: function(frame) {
              return frame.tag === 'a' && frame.text.trim() === 'GIF';
            },
            transformTags: {
              'img': sanitizeHTML.simpleTransform('img', {height: 'auto', display: 'block', style: 'max-width: 100%'}), // max-width only down scale,
              'video': sanitizeHTML.simpleTransform('video', {height: 'auto', display: 'block', style: 'max-width: 100%'}),
            },
          });        

          // Iterate each <p> tag to get img_urls
          $('#div_content > div.post_view > div.post_content > article > div').children('p').each(function() {
            const img_url = $(this).children('img').attr('src');
            if(img_url) {
              img_urls.push(img_url);
            }
          });
          
          // Validate post, then insert to DB if not exist
          if(title && url && content && img_urls.length > 0 ) {
            // Create new post
            let newPost = new Post({
              title: title,
              source: url,
              img_urls: img_urls,
              text: content,
              category: 'test',
              hits: 0
            });
            console.log(newPost);
            
            // Create new post if given URL is not exist.
            await Post.findOneAndUpdate(
              { source: url },
              { $setOnInsert: newPost },
              { upsert: true, new: true});
          }
        }
        // wait for certain amount for each reqeust
        await wait(); 
      } 
    }
  } catch(e) {
    console.log(e);
  }
}

//FMKOREA
async function fmkorea_crawler() {
  try {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
      + 'Chrome/75.0.3770.100 Safari/537.36';

    const domain = "https://www.fmkorea.com/best2"
    const response = await axios.get(domain, {
      headers: {
        'User-Agent': userAgent
      }
    });

    if(response.status === 200) {
      const rawHTML = response.data;
      const $ = cheerio.load(rawHTML);
      
      let links = [];
      const post_list = $('h3.title').each(function() {
        const post_url = domain + $(this).children('a').attr('href');
        links.push(post_url);
      })

      // Visit each links for crawling
      for(link of links) {
        const min = 2;
        const max = 8;
        const rand = Math.floor(Math.random() * (max - min + 1) + min);
        const response = await axios.get(link, {
          headers: {
            'User-Agent': userAgent
          }
        });

        if(response.status === 200) {
          const rawHTML = response.data;
          const $ = cheerio.load(rawHTML);
          const title = $('span.np_18px_span').text().trim();
          const img_urls = [];
          $('article').find('img').each(function() {
            const img_url = $(this).attr('src');
            img_urls.push(img_url);
          })
          let newPost = new Post({
            title: title,
            source: link,
            img_urls: img_urls,
            text: "test text",
            category: 'test',
            hits: 0
          });
          console.log(newPost);
        }
      }
    }
  } catch(e) {
    console.log(e);
  }
}
//fmkorea_crawler();

// setTimeOut wrapper for async/await
const wait = () => {
  const min = 5;
  const max = 10;
  const randTime = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
  return new Promise(resolve => {
    setTimeout(resolve, randTime);
  });
}

const PORT = process.env.CRAWLER_PORT;
app.listen(PORT, () => console.log(`Crawler Server started on port ${PORT}`));

