var Class = require('./class'),
    _ = require('lodash'),
    Mediator = require('./mediator'),
    emptyFn = function(){};

module.exports = Class.extend({
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
     * Emits an action.
     *
     * @param {string} actionName
     * @param {object} payload
     * @return {void}
     */
    emit: function(actionName, payload) {
        this._mediator.dispatch(actionName, payload);
    },

    /**
     * Register handler for an action
     *
     * @param {string} actionName
     * @param {Function} handler
     * @return {void}
     */
    on: function(actionName, handler) {
        this._mediator.register(actionName, handler);
    },

    /**
     * Removes a handler for an action
     *
     * @param {string} actionName
     * @param {Function} handler
     * @return {void}
     */
    off: function(actionName, handler) {
        this._mediator.unregister(actionName, handler);
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