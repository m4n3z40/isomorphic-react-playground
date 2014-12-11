var _ = require('lodash');

var defaults = {
    siteTitle: 'Taskinator',
    defaultLanguage: 'pt'
};

module.exports = {
    development: _.assign({}, defaults),
    testing: _.assign({}, defaults),
    production: _.assign({}, defaults)
};