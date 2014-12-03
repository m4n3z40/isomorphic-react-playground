var _ = require('lodash');

var defaults = {
    siteTitle: 'React rocks!',
    defaultLanguage: 'pt'
};

module.exports = {
    development: _.assign({}, defaults),
    testing: _.assign({}, defaults),
    production: _.assign({}, defaults)
};