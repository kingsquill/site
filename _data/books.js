const axios = require('axios');

let cached;

module.exports = async function () {
  if (!cached) {
    cached = (await axios.get('https://read.kingsquill.org/stats.json')).data;
  }

  return cached;
}