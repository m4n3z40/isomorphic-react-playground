var pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g, // Regex for targeting query key=value pattern
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    encode = encodeURIComponent;

/**
 * Serialize object to URL query string
 *
 * @param {Object} obj
 * @return {string}
 */
function serialize(obj) {
    var str = [];
    for(var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encode(p) + "=" + encode(obj[p]));
        }
    return str.join("&");
}

/**
 * Parses a URL query string and returns a hash of its values
 *
 * @param {string} query
 * @return {Object}
 */
function parse(query) {
    var match,
        urlParams = {};

    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }

    return urlParams;
}

module.exports = {
    serialize: serialize,
    parse: parse
};