var _ = require('lodash'),
    Application = require('../core/application'),
    Store = require('../core/store');

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
        return this.props.app.getStore(name);
    },

    /**
     * Normalize the store listeners hash as a array of objects
     *
     * @return {Array}
     * @protected
     */
    _normalizeStoreListeners: function() {
        var me = this,
            app = this.props.app,
            storeListeners = me.constructor.storeListeners,
            normalizedHandlers = [];

        _.forIn(storeListeners, function(handler, storeName) {
            var store = app.getStore(storeName);

            if (!store) {
                throw new Error('Store ' + storeName + ' has not been registered in the app container.');
            }

            if (_.isString(handler)) {
                handler = me[handler];
            }

            normalizedHandlers.push({
                handler: handler,
                store: store
            });
        });

        return normalizedHandlers;
    }
};