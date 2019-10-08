const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scraperSchema = new Schema({
  url : {type : String },
  referenceCount : { type: Number, default : 1},
  parameters : [ {type : String }],
  crawled: {type: String, default : false}
});

module.exports = mongoose.model('Scraper', scraperSchema);;