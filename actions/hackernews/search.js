var HackerNewsConstants = require('../../constants/hackernews');

/**
 * Emits a search action to the hacker news store
 *
 * @param {Application} app
 * @param {Object} payload
 * @param {Function} callback
 */
module.exports = function searchHackerNews(app, payload, callback) {
    app.emit(HackerNewsConstants.SEARCH_START, payload);

    app.getService('HackernewsService').search(payload, function(error, response) {
        if (error) {
            app.emit(HackerNewsConstants.SEARCH_ERROR, error);
            return callback && callback(error);
        }

        app.emit(HackerNewsConstants.SEARCH_SUCCESS, response.hits);
        callback && callback(null, response);
    });
};