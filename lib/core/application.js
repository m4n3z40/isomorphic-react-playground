var Class = require('./class'),
    ConfigManager = require('./config-manager'),
    Container = require('./container'),
    Mediator = require('./mediator'),
    appConfig = require('../../configs/app'),
    pathsConfig = require('../../configs/paths'),
    serverConfig = require('../../configs/server');

module.exports = Class.extend({
    /**
     * Instantiates an application with the default dependencies
     *
     * @constructor
     */
    constructor: function() {
        this.container = new Container();
        this.container.registerSingleton('mediator', function() { return new Mediator(); });
        this.container.registerSingleton('config', new ConfigManager(this.globalConfigDependencies()));
    },

    /**
     * Returns an array of global config dependencies
     *
     * @returns {array}
     */
    globalConfigDependencies: function() {
        return [
            {name: 'paths', content: pathsConfig},
            {name: 'server', content: serverConfig},
            {name: 'app', content: appConfig}
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
        var config = this.get('config');

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
            return this.get(name);
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
            return this.get(name);
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
            return this.get(name);
        }

        this.container.registerFactory(name, value, scope);
    },

    /**
     * Register a handler for the given event
     *
     * @param {string} event
     * @param {Function} handler
     */
    on: function(event, handler) {
        this.get('mediator').register(event, handler);
    },

    /**
     * Removes the handler for the given event
     *
     * @param {string} event
     * @param {Function} handler
     */
    off: function(event, handler) {
        this.get('mediator').unregister(event, handler);
    },

    /**
     * Executes all registered handlers for the given event
     *
     * @param {string} event
     * @param {Object} payload
     */
    dispatch: function(event, payload) {
        this.get('mediator').dispatch(event, payload);
    },

    /**
     * Indicates if an event is currently being dispatched
     *
     * @param {string} event
     * @returns {boolean}
     */
    isDispatching: function(event) {
        return this.get('mediator').isDispatching(event);
    }
});