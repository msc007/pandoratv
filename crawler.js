const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
//const cron = require('node-cron');
const dotenv = require('dotenv').config();
const Post = require('./models/Post');

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
      let links = [];
      // Scrape all the links
      const post_list = $('div.recommend_underList').children('div').each(function() {
        let titleLength = $(this).find('div.list_title').children().length;
        let post_hit = $(this).find('div.list_hit').text().trim();
        //if hit format uses k, convert it to number
        if(post_hit.includes('k')) {
          post_hit = post_hit.replace(' k','').replace('.','');
          post_hit *= 100;
        }
        //TODO: consider only parse post with image
        // Add to list only if hit is > x
        if(post_hit > 20000 && titleLength === 3) {
          const post_url = 'https://www.clien.net' + $(this).find('a.list_subject').attr('href').replace('?type=recommend','');
          links.push(post_url);
        }
      })

      // Visit each links for crawling
      for(link of links) {
        const max = 5;
        const min = 1;
        const rand = Math.floor(Math.random() * (max - min + 1) + min);
        const response = await axios.get(link, {
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
          const article = [];
          let text = "";

          // Iterate each <p> tag
          $('#div_content > div.post_view > div.post_content > article > div').children('p').each(function() {
            const img_url = $(this).children('img').attr('src');
            const out_link = $(this).find('.url').attr('src');

            //TODO: consider crawl entire article by sanitize-html package or iconv-lite https://namunotebook.tistory.com/10
            // consider article way 
            if(img_url) {
              img_urls.push(img_url);
              //article.push({type: 'img', data: img_url});
            } else if(out_link) {
              text += `<a href='${out_link}' target='_blank'>${out_link}</a>` + '\n';
              //article.push({type: 'link', data: out_link})
            } else if($(this).text().trim() !== "") {
              text += $(this).text().trim() + '\n';
              //article.push({type: 'text', data: $(this).text().trim()});
            }
          });
          // Create new post
          let newPost = new Post({
            title: title,
            source: link,
            img_urls: img_urls,
            text: text,
            category: 'test',
            hits: 0
          });
          console.log(newPost);
          //console.log(article);
          
          // Create new post if given URL is not exist.
          await Post.findOneAndUpdate(
            { source: link },
            { $setOnInsert: newPost },
            { upsert: true, new: true});
        }
      } 
    }
  } catch(e) {
    console.log(e);
  }
}

//clien_crawler();



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
        const max = 5;
        const min = 1;
        const rand = Math.floor(Math.random() * (max - min + 1) + min);
        setTimeout(async function() {
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
        }, rand * 1000);  
      }
    }
  } catch(e) {
    console.log(e);
  }
}
//fmkorea_crawler();

const PORT = process.env.CRAWLER_PORT;
app.listen(PORT, () => console.log(`Crawler Server started on port ${PORT}`));

