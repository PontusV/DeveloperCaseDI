const parseString = require('xml2js').parseString;

module.exports = function parseRSSFeed(feed) {
    if (!feed) return null;
    try {
        let data;
        parseString(feed.data.toString(), (err, result) => {
            data = result;
        });
        const channel = data.rss.channel[0];
        if (!channel) return null;
        return {
            title: channel.title && channel.title[0],
            link: channel.link && channel.link[0],
            description: channel.description && channel.description[0],
            items: channel.item && channel.item
        };
    } catch (error) {
        console.error(`Failed to parse RSS feed. Error: ${error}`);
        return null;
    }
}