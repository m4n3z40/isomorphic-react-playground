var _ = require('lodash'),
    React = require('react'),
    StoreMixin = require('../../lib/mixins/store'),
    HackerNewsItem = require('./HackerNewsItem.jsx');

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
            storeListeners: ['HackernewsStore']
        },

        /**
         * Returns the initial state object for this component
         *
         * @return {Object}
         */
        getInitialState: function () {
            return {hackernews: this.getStore('HackernewsStore').getAll()};
        },

        /**
         * This handlers gets executed from within by the StoreMixin whenever a store
         * defined in the storeListeners static property emits that a change occurred.
         *
         * @param {HackernewsStore} hackerNewsStore
         * @return {void}
         */
        onChange: function (hackerNewsStore) {
            this.setState({hackernews: hackerNewsStore.getAll()});
        },

        /**
         * Renders the content of the component and its children
         *
         * @return {XML}
         */
        render: function () {
            var me = this,
                hackerNews = this.state.hackernews;

            if (hackerNews.length === 0) return <h3>No hackerNews. Just hanging.</h3>;

            return (
                <ul>
                {_.map(hackerNews, function (hackerNewsItem) {
                    return <HackerNewsItem key={hackerNewsItem.objectID} item={hackerNewsItem} />;
                })}
                </ul>
            );
        }
    });