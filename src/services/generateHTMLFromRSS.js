module.exports = function generateHTMLFromRSS(feed) {
    if (!feed) {
        return '<h1>Failed to retrieve RSS feed</h1>';
    }
    try {
        const sortedFeedItems = feed.items.sort((a, b) => {
            return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
        }).slice(0, 10);
        let content = `<h1>${feed.title}</h1>`;
        sortedFeedItems.forEach(item => {
            content += `<a href="${item.link}"><div id="article">`;
            content += generateThumbnail(item);
            content += generateInnerContent(item);
            content += `</div></a>`;
        });
        return content;
    } catch (error) {
        console.error(error);
        return '<h1>Failed to retrieve RSS feed</h1>';
    }
}

function generateThumbnail(item) {
    if (!item || !item['media:content']) {
        return '';
    }
    let content = '';
    item['media:content'].forEach(media => {
        const thumbnail = media['media:thumbnail'] && media['media:thumbnail'][0];
        if (thumbnail) {
            content += `<img src='${thumbnail.$.url}' /><br/>`;
        }
    });
    return content;
}

function generateInnerContent(item) {
    if (!item) {
        return '';
    }
    let content = '';
    content += `<div id="inner">`;
    content += `<h3>${item.title}</h3><br/>`;
    content += `<p>Author: ${item['dc:creator'] || 'Not specified'}</p>`;
    content += `<p>Published: ${new Date(item.pubDate).toLocaleString()}</p>`;
    content += `</div>`;
    return content;
}