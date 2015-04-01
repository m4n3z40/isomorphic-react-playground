var React = require('react'),
    HackerNewsList = require('./hackernews/HackerNewsList.jsx');

module.exports = function(App) {
    return React.createClass({
        /**
         * Static members
         */
        statics: {
            /**
             * React-router transition hook, gets executed when transitioning to this page
             *
             * @param {Transition} transition
             * @param {Object} params
             * @param {Object} query
             * @param {Function} callback
             * @return {void}
             */
            willTransitionTo: function (transition, params, query, callback) {
                if (App.getStore('HackernewsStore').getAll().length) {
                    return callback();
                }

                App.executeAction('searchHackerNews', {page: 0, tags: 'story'}, callback);
            }
        },

        /**
         * Returns the default properties for the component
         *
         * @return {Object}
         */
        getDefaultProps: function() {
            return {app: App};
        },

        /**
         * Returns the initial state of the component
         *
         * @return {Object}
         */
        getInitialState: function () {
            return {
                params: {
                    page: 0,
                    tags: 'story'
                }
            };
        },

        /**
         * Returns an indication telling react if this component should update or not
         *
         * @return {boolean}
         */
        shouldComponentUpdate: function() {
            return false;
        },

        /**
         * Handler for the 'next page button', executes the search hacker news action incrementing a page
         *
         * @return {void}
         */
        onNextPageClick: function () {
            var currParams = this.state.params;

            currParams.page = ++currParams.page;

            this.setState({params: currParams});

            this.props.app.executeAction('searchHackerNews', this.state.params);
        },

        /**
         * Renders the content of the component and its children
         *
         * @return {XML}
         */
        render: function () {
            return (
                <div>
                    <HackerNewsList {...this.props} />
                    <footer>
                        <button onClick={this.onNextPageClick}>Next page</button>
                    </footer>
                </div>
            );
        }
    });
};