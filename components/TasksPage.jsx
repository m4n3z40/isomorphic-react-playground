var React = require('react'),
    TasksFilter = require('./tasks/TasksFilter.jsx'),
    TasksList = require('./tasks/TasksList.jsx'),
    TaskComposer = require('./tasks/TaskComposer.jsx');

module.exports = React.createClass({
    /**
     * Returns the default props for this Component
     *
     * @return {Object}
     */
    getDefaultProps: function() {
        return { app: null };
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
                <TasksFilter {...props} />
                <TasksList {...props} />
                <TaskComposer {...props} />
            </div>
        );
    }
});