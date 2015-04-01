/**
 * Retrieves the list of tasks
 *
 * @param {Object} params
 * @param {Function} callback
 * @return {void}
 */
function search(params, callback) {
    var url = this.config('urls').huApiBase + 'packages/suggestion';

    if (params && (typeof params === 'object')) {
        url += '?' + this.util('url').serialize(params);
    }

    fetch(url)

        .then(this.util('response').parseJson)

        .then(
            function(responseObj) { callback(null, responseObj); },
            callback
        );
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
        name: 'PackageSuggestionsService',

        /**
         * Bind this on the search operation to the app instance
         */
        search: search.bind(app)
    };
};