const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv').config();
const sanitizeHTML = require('sanitize-html');
const uuidv5 = require('uuid/v5');
const { uploadToS3 } = require('../aws-s3');
const Post = require('../models/Post');
const { wait } = require('../utils');
const AWS_S3_BUCKET_URL = 'https://s3.us-east-2.amazonaws.com/images.pandoratv/';

exports.clien_crawler = async () => {
  try {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
      + 'Chrome/75.0.3770.100 Safari/537.36';

    const domain = 'https://www.clien.net/service/recommend';
    const response = await axios.get(domain, {
      withCredentials: true,
      headers: {
        'User-Agent': userAgent,
        Cookie: 'CDNSEC=e19a50f57ff50fc4b8485dd88ef59115;',  // To avoid crawling detection
      }
    });
    
    if(response.status === 200) {
      const existing_urls = await Post.find({}, 'source -_id');
      let urls= [];
      const rawHTML = response.data;
      const $ = cheerio.load(rawHTML);
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
        if(post_hit > 23000 && titleLength === 3) {
          const post_url = 'https://www.clien.net' + $(this).find('a.list_subject').attr('href').replace('?type=recommend','');
          // only push urls that are not already exists
          if(existing_urls.length === 0 || !existing_urls.find(obj => obj.source === post_url)) {
            console.log(post_url);
            urls.push(post_url);
          }
        }
      });
      // Visit each url for crawling
      for(const url of urls) {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': userAgent,
            Cookie: 'CDNSEC=e19a50f57ff50fc4b8485dd88ef59115;',  // To avoid Clien crawling detection
          }
        });

        if(response.status === 200) {
          const rawHTML = response.data;
          const $ = cheerio.load(rawHTML);
          const hasCategory = $('h3.post_subject').children('span').length == 2 ? true : false;
          const title = hasCategory ? $('#div_content > div.post_title.symph_row > h3 > span:nth-child(2)').text().trim() : $('#div_content > div.post_title.symph_row > h3 > span').text().trim(); 
          const img_urls = [];
          const promises = [];
          // Iterate each <p> tag to get img_urls; Note: cheerio .each() is synchronous, need to use promise inside
          $('#div_content > div.post_view > div.post_content > article > div').children('p').each(function() {
            const img_url = $(this).children('img').attr('src');
            if(img_url) {
              promises.push(new Promise((resolve, reject) => {
                uploadToS3(img_url)
                  .then((uploadResponse) => {
                    const s3_url = uploadResponse['Location'];
                    img_urls.push(s3_url);
                    $(this).children('img').attr('src', s3_url);  // replace img src url
                    resolve();
                  })
                  .catch((err) => {
                    reject();
                  });
              }))
            }
          });

          // After all the images are uploaded to S3 and urls are set to s3_url
          Promise.all(promises)
            .then(async () => {
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
                exclusiveFilter: function(frame) {  // Clien speicific
                  return frame.tag === 'a' && frame.text.trim() === 'GIF';
                },
                transformTags: {
                  'img': sanitizeHTML.simpleTransform('img', {height: 'auto', display: 'block', style: 'max-width: 100%'}), // max-width only down scale,
                  'video': sanitizeHTML.simpleTransform('video', {height: 'auto', display: 'block', style: 'max-width: 100%'}),
                },
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
                // Create new post if given URL is not exist.
                const post = await Post.findOneAndUpdate(
                  { source: url },
                  { $setOnInsert: newPost },
                  { upsert: true, new: true});
              }
            });
        }
        // wait for 5 ~ 10 seconds per reqeust
        await wait(5, 10); 
      } 
    }
  } catch(err) {
    console.log(err);
  }
}