var _ = require('lodash');

var defaults = {
	//The host name of the server
	host: 'localhost',

	//The address of the server
	address: '127.0.0.1',

	//The port that the server will listen
	port: process.env.PORT || 3000
};

//The url of the server
defaults.url = 'http://' + defaults.host + ':' + defaults.port;

module.exports = {
	development: _.assign({}, defaults),
	testing: _.assign({}, defaults),
	production: _.assign({}, defaults)
};