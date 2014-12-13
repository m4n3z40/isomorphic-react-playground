var React = require('react'),
    TasksFilter = require('./TasksFilter.jsx'),
    TasksList = require('./TasksList.jsx'),
    TaskComposer = require('./TaskComposer.jsx');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            app: null,
            tasks: [],
            filters: null
        }
    },

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