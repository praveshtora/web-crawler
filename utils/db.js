const mongoose = require('mongoose');
const CONNECTION_URL = "mongodb://127.0.0.1:27017/scraper-db";

const connectDb = async () => {
  try {
    await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDb;