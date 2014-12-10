var Class = require('./class'),
    _ = require('lodash'),
    Mediator = require('./mediator'),
    emptyFn = function(){},
    Store;

module.exports = Store = Class.extend({
    statics: {
        /**
         * Stores the instance count of stores
         */
        __instancesCount: -1,

        /**
         * Returns the current ID for a instance
         *
         * @return {number}
         */
        getCurrentInstanceID: function() {
            return ++Store.__instancesCount;
        }
    },

    /**
     * Stores the instance ID
     *
     * @type {number}
     */
    __instanceID: null,

    /**
     * Name to represent the store, will be the key when adding to the app container
     *
     * @type {string}
     */
    name: 'base',

    /**
     * Instantiates a object of a store
     *
     * @param {Mediator} mediator
     * @param {Object} handlers
     */
    constructor: function(mediator, handlers) {
        handlers = handlers || {};

        this.setMediator(mediator);
        this.setHandlers(_.assign(this.getDefaultHandlers(), handlers));
        this.initialize();

        this.__instanceID = Store.getCurrentInstanceID();
    },

    /**
     * Hook to do some init work that gets called just after the parents contructor has been called
     *
     * @return {void}
     */
    initialize: emptyFn,

    /**
     * Hook that will save the state of the store between server and client
     *
     * @return {Object}
     */
    saveState: emptyFn,

    /**
     * Hook that will restore the state of the store between server and client
     *
     * @param {Object} state
     * @return {void}
     */
    restoreState: emptyFn,

    /**
     * Hook that will register the default handlers of the child stores on instantiation
     *
     * @return {Object}
     */
    getDefaultHandlers: function() {
        return {};
    },

    /**
     * Sets the action handlers by passing a hash object.
     * The key being the action name and
     * the value being a function on name of a function of this class.
     *
     * @param {Object} handlers
     * @return {void}
     */
    setHandlers: function(handlers) {
        if (!_.isObject(handlers)) {
            throw new Error('invalid parameter. Has to be a hash object.');
        }

        var me = this,
            mediator = me._mediator;

        if (mediator && me._handlers) {
            me.__unregisterOwnHandlers();
        }

        me._handlers = handlers;

        if (mediator) me.__registerOwnHandlers();
    },

    /**
     * Returns the handlers hash object.
     *
     * @return {Object}
     */
    getHandlers: function() {
        return this._handlers;
    },

    /**
     * Sets the mediator that will take care of action dispatching in the store.
     *
     * @param {Mediator} mediator
     * @return {void}
     */
    setMediator: function(mediator) {
        if (mediator && !(mediator instanceof Mediator)) {
            throw new Error('Must be a mediator instance.')
        }

        var me = this,
            handlers = me._handlers;

        if (me._mediator && handlers) {
            me.__unregisterOwnHandlers();
        }

        me._mediator = mediator;

        if (handlers) me.__registerOwnHandlers();
    },

    /**
     * Gets the mediator instance.
     *
     * @return {Mediator}
     */
    getMediator: function() {
        return this._mediator;
    },

    /**
     * Gets the change action name for this store instance
     *
     * @return {string}
     */
    getChangeActionName: function() {
        return 'CHANGE_ACTION.' + this.name + '.' + this.__instanceID;
    },

    /**
     * Register a listener that will be notified of every change that happens in the store
     *
     * @param {Function} listener
     * @return {void}
     */
    registerListener: function(listener) {
        this._mediator.register(this.getChangeActionName(), listener);
    },

    /**
     * Returns if there are listeners waiting changes of this store
     *
     * @return {boolean}
     */
    hasListeners: function() {
        return this._mediator.hasHandlers(this.getChangeActionName());
    },

    /**
     * Removes the change listener waiting for changes of this store
     *
     * @param {Function} listener
     */
    removeListener: function(listener) {
        this._mediator.unregister(this.getChangeActionName(), listener);
    },

    /**
     * Notifies all listeners that the store has changed its state
     *
     * @return {void}
     */
    emitChanges: function() {
        this._mediator.dispatch(this.getChangeActionName(), this);
    },

    /**
     * Registers all handlers that is contained in the current handlers hash object
     *
     * @return {void}
     * @private
     */
    __registerOwnHandlers: function() {
        var me = this,
            mediator = me._mediator;

        _.forOwn(me._handlers, function(handler, actionName) {
            mediator.register(actionName, _.isFunction(handler) ? handler : me[handler]);
        });
    },

    /**
     * Removes all handlers that is contained in the current handlers hash object
     *
     * @return {void}
     * @private
     */
    __unregisterOwnHandlers: function() {
        var me = this,
            mediator = me._mediator;

        _.forOwn(me._handlers, function(handler, actionName) {
            mediator.unregister(actionName, _.isFunction(handler) ? handler : me[handler]);
        });
    }
});