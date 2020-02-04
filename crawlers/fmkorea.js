//FMKOREA
export const fmkorea_crawler = async () => {
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
      for(const link of links) {
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