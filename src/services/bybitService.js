const axios = require('axios');

const BYBITBASEURL = process.env.BYBITBASEURL;

async function getServerTime() {
  const url = `${BYBITBASEURL}/v5/market/time`;
  const response = await axios.get(url);
  return response.data;
}

module.exports = {
  getServerTime,
};
