var _ = require('lodash'),
    React = require('react'),
    StoreMixin = require('../../lib/mixins/store'),
    AutocompleteOption = require('./AutocompleteOption.jsx'),
    PackageOption = require('./PackageOption.jsx');

module.exports = React.createClass({
    /**
     * The components mixins
     */
    mixins: [StoreMixin],

    /**
     * The components static properties
     */
    statics: {
        /**
         * The lists of Stores that the components responds to
         */
        storeListeners: ['PackageSuggestionsStore']
    },

    /**
     * Returns the initial state object for this component
     *
     * @return {Object}
     */
    getInitialState: function () {
        var store = this.getStore('PackageSuggestionsStore');

        return {
            autocompleteSuggestions: store.getAutocompleteSuggestions(),
            packageSuggestions: store.getPackageSuggestions()
        };
    },

    /**
     * This handlers gets executed from within by the StoreMixin whenever a store
     * defined in the storeListeners static property emits that a change occurred.
     *
     * @param {PackageSuggestionsStore} packagesSuggestionStore
     * @return {void}
     */
    onChange: function (packagesSuggestionStore) {
        this.setState({
            autocompleteSuggestions: packagesSuggestionStore.getAutocompleteSuggestions(),
            packageSuggestions: packagesSuggestionStore.getPackageSuggestions()
        });
    },

    /**
     * Handler for the autocomplete option click
     *
     * @param {Object} autocompleteOption
     * @return {void}
     */
    onAutocompleteOptionClick: function(autocompleteOption) {
        this.props.onAutocompleteOptionClick(autocompleteOption);
    },

    /**
     * Handler for the package option click
     *
     * @param {Object} packageOption
     * @return {void}
     */
    onPackageOptionClick: function(packageOption) {
        this.props.onPackageOptionClick(packageOption);
    },

    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
    render: function () {
        var _this = this,
            state = _this.state,
            autocompleteSuggestions = state.autocompleteSuggestions,
            packageSuggestions = state.packageSuggestions,
            autocompleteOptionsList = autocompleteSuggestions.length ?
                _.map(autocompleteSuggestions, function(suggestion) {
                    return <AutocompleteOption option={suggestion} key={suggestion.id} onOptionClick={_this.onAutocompleteOptionClick}/>
                }) :
                null,
            packagesOptionsList = packageSuggestions.length ?
                _.map(packageSuggestions, function(suggestion) {
                    return <PackageOption option={suggestion} key={suggestion.id} onOptionClick={_this.onPackageOptionClick}/>
                }) :
                null,
            noResults = <li><h3>No results found.</h3></li>;

        return (
            <div>
                <h3>Suggestions</h3>
                <ul>
                    {autocompleteOptionsList ? autocompleteOptionsList : noResults}
                </ul>
                <h3>Packages</h3>
                <ul>
                    {packagesOptionsList ? packagesOptionsList : noResults}
                </ul>
            </div>
        );
    }
});