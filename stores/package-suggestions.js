var _ = require('lodash'),
    Store = require('../lib/core/store'),
    PackageSuggestionsConstants = require('../constants/package-suggestions');

module.exports = Store.extend({
    /**
     * Identifier of the store
     *
     * @type {string}
     */
    name: 'PackageSuggestionsStore',

    /**
     * Returns the default handlers for actions that the store listens to
     *
     * @return {Object}
     */
    getDefaultHandlers: function() {
        var handlers = {};

        handlers[PackageSuggestionsConstants.SEARCH_SUCCESS] = '_onSearchSuccess';

        return handlers;
    },

    /**
     * Initializes the store
     *
     * @returns {void}
     */
    initialize: function() {
        this.autocompleteSuggestions = [];
        this.packageSuggestions = [];
    },

    /**
     * Returns the list of places suggestions
     *
     * @return {array}
     */
    getAutocompleteSuggestions: function() {
        return this.autocompleteSuggestions;
    },

    /**
     * Returns the list of packages suggestions
     *
     * @return {array}
     */
    getPackageSuggestions: function() {
        return this.packageSuggestions;
    },

    /**
     * Returns the current state of the store for being restored later
     *
     * @return {Object}
     */
    saveState: function() {
        return {
            autocompleteSuggestions: this.autocompleteSuggestions,
            packageSuggestions: this.packageSuggestions
        };
    },

    /**
     * Restores the saved state of the store
     *
     * @param {string} state
     * @return {void}
     */
    restoreState: function(state) {
        this.autocompleteSuggestions = state.autocompleteSuggestions || [];
        this.packageSuggestions = state.packageSuggestions || [];
    },

    /**
     * Handler for when the SEARCH_SUCCESS action is executed
     *
     * @param {Object} response
     * @return {void}
     * @protected
     */
    _onSearchSuccess: function(response) {
        this.autocompleteSuggestions = response.suggestions;
        this.packageSuggestions = response.packages;

        this.emitChanges();
    }
});