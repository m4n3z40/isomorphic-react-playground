var _ = require('lodash');

var defaults = {
    hackernewsApiBase: 'http://hn.algolia.com/api/v1/',
    apiBase: 'http://localhost:3000/api/',
    base: 'http://localhost:3000/'
};

module.exports = {
    development: _.assign({}, defaults),
    testing: _.assign({}, defaults),
    production: _.assign({}, defaults)
};