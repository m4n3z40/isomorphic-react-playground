var _ = require('lodash');

var defaults = {
	//The path blob of the test files
	testsBlob: './tests/**/*-spec.js',

	unwatchedFiles: [
		'assets/css/app.css',
		'assets/js/app.js',
		'.git/*',
		'.idea/*'
	],

	//The paths of source files that needs to be watched or compiled
	source: {
		//The entry style file
		stylesMain: './styles/app.styl',

		//The entry file for the client scripts
		clientMainScript: './client.js'
	},

	//The paths where the compiled files will go
	dist: {
		//The directory where the css will go after stylus compile
		styles: './assets/css',

		//The directory where the client scripts bundle will go after browserify bundles all client scripts
		clientBundle: './assets/js',

		//The name of the client scripts bundle file
		clientMainScript: 'app.js'
	}
};

module.exports = {
	development: _.assign({}, defaults),
	testing: _.assign({}, defaults),
	production: _.assign({}, defaults)
};