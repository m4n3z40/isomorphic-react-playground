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

    saveItem: function(task) {
        this.props.app.executeAction('updateTask', task);
    },

    removeItem: function(task) {
        this.props.app.executeAction('removeTask', task);
    },

    render: function() {
        var me = this,
            tasks = this.state.tasks;

        if (tasks.length === 0) return <h3>No tasks. Just hanging.</h3>;

        return (
            <ol>
                {_.map(tasks, function(task) {
                    return <TaskItem key={task.id} task={task}
                        handleSave={me.saveItem} handleRemove={me.removeItem} />;
                })}
            </ol>
        );
    }
});