var _ = require('lodash');

var defaults = {
    apiBase: 'http://localhost:3000/api/',
    base: 'http://localhost:3000/'
};

module.exports = {
    development: _.assign({}, defaults),
    testing: _.assign({}, defaults),
    production: _.assign({}, defaults)
};