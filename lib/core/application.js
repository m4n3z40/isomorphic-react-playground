var Class = require('./class'),
    ConfigManager = require('./config-manager'),
    Container = require('./container'),
    Mediator = require('./mediator'),
    Store = require('./store'),
    appConfig = require('../../configs/app'),
    pathsConfig = require('../../configs/paths'),
    urlsConfig = require('../../configs/urls'),
    urlUtils = require('../utils/url'),
    responseUtils = require('../utils/response'),
    _ = require('lodash'),
    React = require('react'),
    Router = require('react-router');

/**
 * Prefix for the stores contained in the container
 *
 * @type {string}
 */
var STORES_PREFIX = 'store.';

/**
 * Prefix for the actions contained in the container
 *
 * @type {string}
 */
var ACTIONS_PREFIX = 'action.';

/**
 * Prefix for the services contained in the container
 * @type {string}
 */
var SERVICES_PREFIX = 'service.';

/**
 * Prefix for the utils container in the container
 * @type {string}
 */
var UTILS_PREFIX = 'utils.';

module.exports = Class.extend({
    /**
     * Instantiates an application with the default dependencies
     *
     * @constructor
     */
    constructor: function() {
        var _this = this;

        _this._registeredStores = [];
        _this._routes = null;

        _this._container = new Container();
        _this._container.registerSingleton('mediator', function() { return new Mediator(); });
        _this._container.registerSingleton('config', new ConfigManager(_this._globalConfigDependencies()));

        _this._defaultUtils().forEach(function(item) {
            _this.util(item.name, item.util);
        });
    },

    /**
     * Returns an array of global config dependencies
     *
     * @returns {array}
     * @private
     */
    _globalConfigDependencies: function() {
        return [
            {name: 'paths', content: pathsConfig},
            {name: 'app', content: appConfig},
            {name: 'urls', content: urlsConfig}
        ];
    },

    /**
     * Returns an array of default utils available by the app
     *
     * @return {array}
     * @private
     */
    _defaultUtils: function() {
        return [
            {name: 'url', util: urlUtils},
            {name: 'response', util: responseUtils}
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
     * Gets a util from the app container
     *
     * @param {string} name
     * @param {Function|Object} util
     * @return {void}
     */
    util: function(name, util) {
        var type = typeof util;

        if (!util && (type !== 'object' && type !== 'function')) {
            return this.get(UTILS_PREFIX + name);
        }

        this.value(UTILS_PREFIX + name, util);
    },

    /**
     * Returns a registered object from the container if exists
     *
     * @param {string} name
     * @returns {*}
     */
    get: function(name) {
        return this._container.get(name);
    },

    /**
     * Adds a store to the app container
     *
     * @param {Store} store
     * @return {void}
     */
    addStore: function(store) {
        if (store && !(store instanceof Store)) {
            throw new Error('Must be an instance of Store.');
        }

        if (!store.getMediator()) {
            store.setMediator(this.get('mediator'));
        }

        var storeKey = STORES_PREFIX + store.name;

        this.singleton(storeKey, store);
        this._registeredStores.push(storeKey);
    },

    /**
     * Removes a store from the app container
     *
     * @param {string} storeName
     * @return {void}
     */
    removeStore: function(storeName) {
        var storeKey = STORES_PREFIX + storeName,
            registeredStores = this._registeredStores;

        this._container.remove(storeKey);
        registeredStores.splice(registeredStores.indexOf(storeKey), 1);
    },

    /**
     * Returns the store contained in the app container
     *
     * @param storeName
     * @return {Store}
     */
    getStore: function(storeName) {
        return this.get(STORES_PREFIX + storeName);
    },

    /**
     * Adds an action to the app container to be executed later
     *
     * @param {Function} action
     * @return {void}
     */
    addAction: function(action) {
        this.singleton(ACTIONS_PREFIX + action.identifier, function() {
            return action;
        });
    },

    /**
     * Removes an action from the app container
     *
     * @param {string} actionName
     * @return {void}
     */
    removeAction: function(actionName) {
        this._container.remove(ACTIONS_PREFIX + actionName);
    },

    /**
     * Executes an action registered in the app container
     *
     * @param {string} actionName
     * @param {*} payload
     * @param {Function} callback
     */
    executeAction: function(actionName, payload, callback) {
        this.get(ACTIONS_PREFIX + actionName)(this, payload, callback);
    },

    /**
     * Adds a service object to the app container
     *
     * @param {Object} service
     * @return {void}
     */
    addService: function(service) {
        this.singleton(SERVICES_PREFIX + service.name, service);
    },

    /**
     * Removes a service object from the app container
     *
     * @param {string} name
     * @return {void}
     */
    removeService: function(name) {
        this._container.remove(SERVICES_PREFIX + name);
    },

    /**
     * Gets a service object from the app container
     *
     * @param {string} name
     * @return {Object}
     */
    getService: function(name) {
        return this.get(SERVICES_PREFIX + name);
    },

    /**
     * Restores the global states for all stores registered in the app instance
     *
     * @param {object} state
     * @return {void}
     */
    restoreState: function(state) {
        var me = this;

        _.forEach(me._registeredStores, function(name) {
            me.get(name).restoreState(state);
        });
    },

    /**
     * Returns the state of all stores registered in the app instance
     *
     * @return {Object}
     */
    saveState: function() {
        var me = this;

        return _.reduce(me._registeredStores, function(result, storeName) {
            return _.assign(result, me.get(storeName).saveState());
        }, {});
    },

    /**
     * Sets the routes for the applications
     *
     * @param routes
     * @return {void}
     */
    setRoutes: function(routes) {
        this._routes = routes;
    },

    /**
     * Gets the application routes
     *
     * @return {Route}
     */
    getRoutes: function() {
        return this._routes;
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

        this._container.registerSingleton(name, value, scope);
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

        this._container.registerValue(name, value, scope);
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

        this._container.registerFactory(name, value, scope);
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
    emit: function(event, payload) {
        this.get('mediator').dispatch(event, payload);
    },

    /**
     * Renders the app on the server
     *
     * @param {string} currentUrl
     * @param {Object} globalProps
     * @param {Function} callback
     */
    renderServer: function(currentUrl, globalProps, callback) {
        Router.run(this._routes, currentUrl, function(Handler) {
            var content = React.renderToString(React.createElement(Handler, globalProps));

            callback(content);
        });
    },

    /**
     * Renders the app on the client
     *
     * @param {HTMLElement} container
     * @param {Object} globalProps
     */
    renderClient: function(container, globalProps) {
        Router.run(this._routes, Router.HistoryLocation, function(Handler) {
            React.render(React.createElement(Handler, globalProps), container);
        });
    }
});