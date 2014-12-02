'use strict';

var _ = require('lodash'),
	registry = {};

/**
 * Initializes an instance of a config manager
 *
 * @param {Object} configBundle
 * @constructor
 */
function ConfigManager(configBundle) {
	this.env = process.env.NODE_ENV || 'development';
	this.setMany(configBundle);
}

ConfigManager.prototype = {
	/**
	 * Returns a value of config registered by the name passed, if exists
	 *
	 * @param {string} name
	 * @returns {*}
	 */
	get: function(name) {
		return name in registry ? registry[name] : null;
	},

	/**
	 * Returns true if there is an config value with the specified name, false otherwise
	 *
	 * @param {string} name
	 * @returns {boolean}
	 */
	has: function(name) {
		return name in registry && !!registry[name];
	},

	/**
	 * Sets a config value with the specified name
	 *
	 * @param {string} name
	 * @param {*} config
	 */
	set: function(name, config) {
		if (config && this.env in config) {
			registry[name] = config[this.env];
		}
	},

	/**
	 * Sets an array of config values with the specified data
	 *
	 * @param {array} configBundle
	 */
	setMany: function(configBundle) {
		var me = this;

		_.forEach(configBundle, function(config) {
			me.set(config.name, config.content);
		});
	}
};

module.exports = ConfigManager;