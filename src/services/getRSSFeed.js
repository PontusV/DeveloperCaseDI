const axios = require('axios');

module.exports = async function getRSSFeed() {
    try {
        return await axios.get('https://www.di.se/rss');
    } catch (error) {
        console.error(error);
        return null;
    }
}