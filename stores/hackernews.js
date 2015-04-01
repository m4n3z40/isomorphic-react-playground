var _ = require('lodash'),
    Store = require('../lib/core/store'),
    HackerNewsContants = require('../constants/hackernews');

module.exports = Store.extend({
    /**
     * Identifier of the store
     *
     * @type {string}
     */
    name: 'HackernewsStore',

    /**
     * Returns the default handlers for actions that the store listens to
     *
     * @return {Object}
     */
    getDefaultHandlers: function() {
        var handlers = {};

        handlers[HackerNewsContants.SEARCH_SUCCESS] = '_onSearchSuccess';

        return handlers;
    },

    /**
     * Initializes the store
     *
     * @returns {void}
     */
    initialize: function() {
        this.hackernews = [];
    },

    /**
     * Returns all tasks present now in the store
     *
     * @return {Array}
     */
    getAll: function() {
        return this.hackernews;
    },

    /**
     * Returns the current state of the store for being restored later
     *
     * @return {Object}
     */
    saveState: function() {
        return {hackernews: this.hackernews};
    },

    /**
     * Restores the saved state of the store
     *
     * @param {string} state
     * @return {void}
     */
    restoreState: function(state) {
        this.hackernews = state.hackernews || [];
    },

    /**
     * Handler for when the SEARCH_SUCCESS action is executed
     *
     * @param {array} hackernews
     * @return {void}
     * @protected
     */
    _onSearchSuccess: function(hackernews) {
        this.hackernews = _(this.hackernews).union(hackernews)
                                            .uniq('objectID')
                                            .value();

        this.emitChanges();
    }
});