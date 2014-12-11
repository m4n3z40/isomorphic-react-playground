var _ = require('lodash'),
    React = require('react'),
    StoreMixin = require('../lib/mixins/store'),
    TaskItem = require('./TaskItem.jsx');

module.exports = React.createClass({
    mixins: [StoreMixin],

    statics: {
        storeListeners: ['TasksStore']
    },

    getInitialState: function() {
        return {
            tasks: []
        };
    },

    onChange: function(tasksStore) {
        this.setState({ tasks: tasksStore.getAll() });
    },

    render: function() {
        var tasks = this.state.tasks;

        if (tasks.length === 0) return <h3>No tasks. Just hanging.</h3>;

        return (
            <ul>
                {_.map(tasks, function(task) {
                    return <TaskItem key={task.id} text={task.text} completed={task.completed} editing={task.editing} />
                })}
            </ul>
        );
    }
});