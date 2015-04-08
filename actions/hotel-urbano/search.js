var PackageSuggestionsConstants = require('../../constants/package-suggestions');

/**
 * Emits a search action to the hacker news store
 *
 * @param {Application} app
 * @param {Object} payload
 * @param {Function} callback
 */
var searchHotelUrbano = module.exports = function(app, payload, callback) {
    app.emit(PackageSuggestionsConstants.SEARCH_START, payload);

    app.getService('PackageSuggestionsService').search(payload, function(error, response) {
        if (error) {
            app.emit(PackageSuggestionsConstants.SEARCH_ERROR, error);
            return callback && callback(error);
        }

        app.emit(PackageSuggestionsConstants.SEARCH_SUCCESS, response);
        callback && callback(null, response);
    });
};

searchHotelUrbano.identifier = 'searchHotelUrbano';