/**
 * Handles the response
 *
 * @param {Function} callback
 * @return {Function}
 */
function handleResponse(callback) {
    return function(response) {
        if (response.status != 200) {
            callback(new Error('Bad response from server'));
        }

        return response.json();
    };
}

/**
 * Retrieves the list of tasks
 *
 * @param {Object} params
 * @param {Function} callback
 * @return {void}
 */
function search(params, callback) {
    var url = this.config('urls').hackernewsApiBase + 'search';

    if (params && (typeof params === 'object')) {
        url += '?' + this.util('url').serialize(params);
    }

    fetch(url)

        .then(handleResponse(callback))

        .then(function(responseObj) {
            callback(null, responseObj);
        });
}

/**
 * Expose the service API
 *
 * @param {Application} app
 * @return {Object}
 */
module.exports = function(app) {
    return {
        /**
         * The services identifier
         */
        name: 'HackernewsService',

        /**
         * Bind this on the search operation to the app instance
         */
        search: search.bind(app)
    };
};