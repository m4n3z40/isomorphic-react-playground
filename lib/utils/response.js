/**
 * Parses a json response
 *
 * @param {Object} response
 * @return {Promise}
 */
function parseJson(response) {
    if (response.status != 200) {
        throw new Error('Bad response from server');
    }

    return response.json();
}

/**
 * Exposed module
 *
 * @type {Object}
 */
module.exports = {
    parseJson: parseJson
};