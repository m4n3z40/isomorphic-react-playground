'use strict';

var _ = require('lodash');

/**
 * Initializes an instance of a config manager
 *
 * @param {Object} configBundle
 * @constructor
 */
function ConfigManager(configBundle) {
	this.__registry = {};
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
		var reg = this.__registry;

		return name in reg ? reg[name] : null;
	},

	/**
	 * Returns true if there is an config value with the specified name, false otherwise
	 *
	 * @param {string} name
	 * @returns {boolean}
	 */
	has: function(name) {
		var reg = this.__registry;

		return name in reg && !!reg[name];
	},

	/**
	 * Sets a config value with the specified name
	 *
	 * @param {string} name
	 * @param {*} config
	 */
	set: function(name, config) {
		if (config) {
			this.__registry[name] = _.isObject(config) && (this.env in config) ? config[this.env] : config;
		}
	},

	/**
	 * Sets an array of config values with the specified data
	 *
	 * @param {array} configBundle
	 */
	setMany: function(configBundle) {
		var me = this;

		if (!configBundle) return;

		if (_.isArray(configBundle)) {
			return _.forEach(configBundle, function (config) {
				me.set(config.name, config.content);
			});
		}

		if(_.isObject(configBundle)) {
			return _.forOwn(configBundle, function(content, name) {
				me.set(name, content);
			});
		}

		throw new Error('Invalid config bundle, it must be an array or object.');
	}
};

module.exports = ConfigManager;