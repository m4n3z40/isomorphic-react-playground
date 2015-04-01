var React = require('react'),
    SearchField = require('./shared/SearchField.jsx'),
    SearchResults = require('./hotel-urbano/SearchResults.jsx');

module.exports = function(App) {
    return React.createClass({

        /**
         * Returns the default properties for the component
         *
         * @return {Object}
         */
        getDefaultProps: function() {
            return {app: App};
        },

        /**
         * Handler for the user search intent
         *
         * @param {string} text
         * @return {void}
         */
        onSearchIntent: function(text) {
            this.props.app.executeAction('searchHotelUrbano', {q: text});
        },

        /**
         * Handler for the autocomplete option click
         *
         * @param {Object} autocompleteOption
         * @return {void}
         */
        onAutocompleteOptionClick: function(autocompleteOption) {
            window.open('http://busca.hotelurbano.com/busca.php?q=' + autocompleteOption.text);
        },

        /**
         * Handler for the package option click
         *
         * @param {Object} packageOption
         * @return {void}
         */
        onPackageOptionClick: function(packageOption) {
            window.open(packageOption.link);
        },

        /**
         * Renders the content of the component and its children
         *
         * @return {XML}
         */
        render: function() {
            var props = this.props;

            return (
                <div>
                    <SearchField {...props}
                                 onSearchIntent={this.onSearchIntent}/>
                    <SearchResults {...props}
                                   onAutocompleteOptionClick={this.onAutocompleteOptionClick}
                                   onPackageOptionClick={this.onPackageOptionClick}/>
                </div>
            );
        }
    });
};