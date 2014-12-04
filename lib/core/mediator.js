var _ = require('lodash');

/**
 * Creates an instance of the event mediator
 * @constructor
 */
function Mediator() {
    this.__registry = {};
    this.__dispatching = [];
}

Mediator.prototype = {
    /**
     * Registers a handler for an event
     *
     * @param {string} event
     * @param {Function} handler
     */
    register: function(event, handler) {
        var registry = this.__registry;

        if (!(event in registry)) {
            registry[event] = [];
        }

        if (_.indexOf(registry[event], handler) > -1) return;

        registry[event].push(handler);
    },

    /**
     * Removes the handler for an event
     *
     * @param {string} event
     * @param {Function} handler
     */
    unregister: function(event, handler) {
        var registry = this.__registry;

        if (!(event in registry)) return;

        if (!handler) {
            delete registry[event];
            return;
        }

        var index = _.indexOf(registry[event], handler);

        if (index > -1) registry[event].splice(index, 1);
    },

    /**
     * Executes all registered handlers for the given event
     *
     * @param {string} event
     * @param {Object} payload
     */
    dispatch: function(event, payload) {
        var registry = this.__registry,
            dispatching = this.__dispatching;

        if (!(event in registry) || this.isDispatching(event)) return;

        dispatching.push(event);

        _.forEach(registry[event], function(handler) {
            return handler(payload);
        });

        dispatching.splice(_.indexOf(dispatching, event), 1);
    },

    /**
     * Returns true if there are handlers registered for the passed event,
     * false otherwise
     *
     * @param {string} event
     * @returns {boolean}
     */
    hasHandlers: function(event) {
        var registry = this.__registry;

        return (event in registry) && (registry[event].length > 0);
    },

    /**
     * Indicates if an event is currently being dispatched
     *
     * @param {string} event
     * @returns {boolean}
     */
    isDispatching: function(event) {
        return _.indexOf(this.__dispatching, event) > -1;
    }
};

module.exports = Mediator;