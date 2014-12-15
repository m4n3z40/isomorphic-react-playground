var React = require('react'),
    TasksFilter = require('./TasksFilter.jsx'),
    TasksList = require('./TasksList.jsx'),
    TaskComposer = require('./TaskComposer.jsx');

module.exports = React.createClass({
    /**
     * Returns the default props for this Component
     *
     * @return {Object}
     */
    getDefaultProps: function() {
        return {
            app: null,
            tasks: [],
            filters: null
        }
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