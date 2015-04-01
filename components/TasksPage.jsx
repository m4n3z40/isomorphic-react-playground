var React = require('react'),
    TasksFilter = require('./tasks/TasksFilter.jsx'),
    TasksList = require('./tasks/TasksList.jsx'),
    TaskComposer = require('./tasks/TaskComposer.jsx');

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
                if (App.getStore('TasksStore').getAll().length) {
                    return callback();
                }

                App.executeAction('showTasks', {page: 0, tags: 'story'}, callback);
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
         * Renders the content of the component and its children
         *
         * @return {XML}
         */
        render: function () {
            var props = this.props;

            return (
                <div>
                    <TasksFilter {...props} />
                    <TasksList {...props} />
                    <TaskComposer {...props} />
                </div>
            );
        }
    });
};