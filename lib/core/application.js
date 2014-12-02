'use strict';

var ConfigManager = require('./config-manager'),
    Container = require('./container'),
    pathsConfig = require('../../configs/paths'),
    serverConfig = require('../../configs/server');

/**
 * Initializes an instance of a application
 *
 * @constructor
 */
function Application() {
    this.container = new Container();
    this.container.registerSingleton('config', new ConfigManager(this.globalConfigDependencies()));
}

Application.prototype = {

    /**
     * Returns an array of global config dependencies
     *
     * @returns {array}
     */
    globalConfigDependencies: function() {
        return [
            {name: 'paths', content: pathsConfig},
            {name: 'server', content: serverConfig}
        ];
    },

    /**
     * Gets or sets a config value
     *
     * @param {string} name
     * @param {*} value
     * @returns {*}
     */
    config: function(name, value) {
        var config = this.container.get('config');

        if (!value) return config.get(name);

        config.set(name, value);
    },

    /**
     * Returns a registered object from the container if exists
     *
     * @param {string} name
     * @returns {*}
     */
    get: function(name) {
        return this.container.get(name);
    },

    /**
     * Registers an instance of a singleton in the app container
     *
     * @param {string} name
     * @param {*} value
     * @param {Object} scope
     * @returns {*}
     */
    singleton: function(name, value, scope) {
        if (!value) {
            return this.container.get(name);
        }

        this.container.registerSingleton(name, value, scope);
    },

    /**
     * Registers a simple value in the app container
     *
     * @param {string} name
     * @param {*} value
     * @param {Object} scope
     * @returns {*}
     */
    value: function(name, value, scope) {
        if (!value) {
            return this.container.get(name);
        }

        this.container.registerValue(name, value, scope);
    },

    /**
     * Registers a factory in the app container
     *
     * @param {string} name
     * @param {Function} value
     * @param {Object} scope
     * @returns {*}
     */
    factory: function(name, value, scope) {
        if (!value) {
            return this.container.get(name);
        }

        this.container.registerFactory(name, value, scope);
    }
};


module.exports = Application;