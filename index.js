const Scraper = require('./models/scrapers');
const cheerio = require('cheerio');
const rp = require('request-promise');
const url = require('url');
const connectDb = require('./utils/db')


const baseUrl = process.env.urlTobeCrawled || 'https://medium.com';


connectDb();

const updateDb = async (mainLink, params) => {
  let query = { url: mainLink };
  let update = { $addToSet: { parameters: params }, $inc: { referenceCount: 1 } }
  let options = { upsert: true, new: true, setDefaultsOnInsert: true }
  try {
    await Scraper.findOneAndUpdate(query, update, options);
  } catch (err) {
    console.log(err);
  }
}

const parsePage = (body) => {
  const $ = cheerio.load(body);
  $('a').each((index, element) => {
    let completeLink = $(element).attr('href');
    let regex = /https:\/\/medium\.com/g
    let found = completeLink.match(regex);
    if(found){
        set.add(promisifyReq(completeLink));
        let mainLink = completeLink.split('?')[0];
        let { query } = url.parse(completeLink, true);
        let params = Object.keys(query);
        updateDb(mainLink, params);
    }
  });
}

const startFetching = () => {

}


const crawlUrl = (url) => {
    rp(url)
      .then(body => parsePage(body))
      .then(startFetching())
      .catch(err => console.log(err))
};

crawlUrl(baseUrl);
