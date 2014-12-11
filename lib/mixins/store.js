var _ = require('lodash'),
    Application = require('../core/application'),
    Store = require('../core/store');

/**
 * Default handler name
 *
 * @type {string}
 */
var DEFAULT_HANDLER_NAME = 'onChange';

module.exports = {
    /**
     * Registers the statically declared listeners
     *
     * @return {void}
     */
    componentDidMount: function() {
        if (!(this.props.app instanceof Application)) {
            throw new Error('This component needs to have the application instance in the props to work properly.');
        }

        var listeners = this._normalizeStoreListeners();

        _.forEach(listeners, function(listener) {
            listener.store.registerListener(listener.handler);
        });

        this._listeners = listeners;
    },

    /**
     * Removes all the listeners registered freeing memory
     *
     * @return {void}
     */
    componentWillUnmount: function() {
        _.forEach(this._listeners, function(listener) {
            listener.store.removeListener(listener);
        });

        this._listeners = null;
    },

    /**
     * Shortcut to get a store instance
     *
     * @param {string} name
     * @return {Store}
     */
    getStore: function(name) {
        var store = this.props.app.getStore(name);

        if (!store) {
            throw new Error('Store ' + storeName + ' has not been registered in the app container.');
        }

        return store;
    },

    /**
     * Normalize the store listeners hash as a array of objects
     *
     * @return {Array}
     * @protected
     */
    _normalizeStoreListeners: function() {
        var storeListeners = this.constructor.storeListeners;

        return _.isArray(storeListeners) ?
            this._normalizeDefaultStoreListeners(storeListeners) :
            this._normalizeCustomStoreListeners(storeListeners);
    },

    /**
     * Normalizes the store listeners with the default handler name
     *
     * @param {Array} listeners
     * @return {Array}
     * @protected
     */
    _normalizeDefaultStoreListeners: function(listeners) {
        var me = this;

        return _.map(listeners, function(storeName) {
            return {
                handler: me[DEFAULT_HANDLER_NAME],
                store: me.getStore(storeName)
            };
        });
    },

    /**
     * Normalizes the store listeners with a custom handler name
     *
     * @param {Object} listeners
     * @return {Array}
     * @protected
     */
    _normalizeCustomStoreListeners: function(listeners) {
        var me = this,
            normalizedHandlers = [];

        _.forIn(listeners, function(handler, storeName) {
            if (_.isString(handler)) {
                handler = me[handler];
            }

            normalizedHandlers.push({
                handler: handler,
                store: me.getStore(storeName)
            });
        });

        return normalizedHandlers;
    }
};