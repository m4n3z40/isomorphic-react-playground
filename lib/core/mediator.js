var _ = require('lodash'),
    registry = {};

/**
 * Creates an instance of the event mediator
 * @constructor
 */
function Mediator() {}

Mediator.prototype = {
    /**
     * stores the events currently being fired
     *
     * @private
     */
    __firing: [],

    /**
     * Registers a handler for an event
     *
     * @param {string} event
     * @param {Function} handler
     */
    register: function(event, handler) {
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
        if (!event || !(event in registry)) return;

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
        if (!event || !(event in registry) || this.isDispatching(event)) return;

        var firingEvents = this.__firing;

        firingEvents.push(event);

        _.defer(function() {
            _.forEach(registry[event], function(handler) {
                return handler(payload);
            });

            firingEvents.splice(event, 1);
        });
    },

    /**
     * Indicates if an event is currently being dispatched
     *
     * @param {string} event
     * @returns {boolean}
     */
    isDispatching: function(event) {
        return _.indexOf(this.__firing, event) > -1;
    }
};

module.exports = Mediator;