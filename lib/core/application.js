var Class = require('./class'),
    ConfigManager = require('./config-manager'),
    Container = require('./container'),
    Mediator = require('./mediator'),
    Store = require('./store'),
    appConfig = require('../../configs/app'),
    pathsConfig = require('../../configs/paths'),
    serverConfig = require('../../configs/server'),
    _ = require('lodash');

var STORES_PREFIX = 'store.';
var ACTIONS_PREFIX = 'actions.';

module.exports = Class.extend({
    /**
     * Instantiates an application with the default dependencies
     *
     * @constructor
     */
    constructor: function() {
        this.__registeredStores = [];
        this.__mainComponent = null;

        this.__container = new Container();
        this.__container.registerSingleton('mediator', function() { return new Mediator(); });
        this.__container.registerSingleton('config', new ConfigManager(this.__globalConfigDependencies()));
    },

    /**
     * Returns an array of global config dependencies
     *
     * @returns {array}
     * @private
     */
    __globalConfigDependencies: function() {
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
        return this.__container.get(name);
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
        this.__registeredStores.push(storeKey);
    },

    /**
     * Removes a store from the app container
     *
     * @param {string} storeName
     * @return {void}
     */
    removeStore: function(storeName) {
        var storeKey = STORES_PREFIX + storeName,
            registeredStores = this.__registeredStores;

        this.__container.remove(storeKey);
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
        this.singleton(ACTIONS_PREFIX + action.name, function() {
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
        this.__container.remove(ACTIONS_PREFIX + actionName);
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
     * Restores the global states for all stores registered in the app instance
     *
     * @param {object} state
     * @return {void}
     */
    restoreState: function(state) {
        var me = this;

        _.forEach(me.__registeredStores, function(name) {
            me.get(name).restoreState(state);
        });
    },

    /**
     * Returns the state of all stores registered in the app instance
     *
     * @return {Object}
     */
    saveState: function() {
        var me = this,
            state = {};

        _.forEach(me.__registeredStores, function(name) {
            _.assign(state, me.get(name).saveState());
        });

        return state;
    },

    /**
     * Sets the main component for the app to render
     *
     * @param {ReactComponent} mainComponent
     * @return {void}
     */
    setMainComponent: function(mainComponent) {
        this.__mainComponent = mainComponent;
    },

    /**
     * Gets the main component for the app to render
     *
     * @return {ReactComponent}
     */
    getMainComponent: function() {
        return this.__mainComponent;
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

        this.__container.registerSingleton(name, value, scope);
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

        this.__container.registerValue(name, value, scope);
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

        this.__container.registerFactory(name, value, scope);
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
     * Indicates if an event is currently being dispatched
     *
     * @param {string} event
     * @returns {boolean}
     */
    isDispatching: function(event) {
        return this.get('mediator').isDispatching(event);
    }
});