var _ = require('lodash'),
    React = require('react'),
    Hash = require('object-hash'),
    StoreMixin = require('../lib/mixins/store'),
    TaskItem = require('./TaskItem.jsx');

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
        storeListeners: ['TasksStore']
    },

    /**
     * Returns the initial state object for this component
     *
     * @return {Object}
     */
    getInitialState: function() {
        return {
            tasks: this.props.tasks
        };
    },

    /**
     * This handlers gets executed from within by the StoreMixin whenever a store
     * defined in the storeListeners static property emits that a change occurred.
     *
     * @param {TaskStore} tasksStore
     * @return {void}
     */
    onChange: function(tasksStore) {
        this.setState({ tasks: tasksStore.getAll() });
    },

    /**
     * Dispatches a updateTask action to the app instance
     *
     * @param {Object} task
     * @return {void}
     */
    saveItem: function(task) {
        this.props.app.executeAction('updateTask', task);
    },

    /**
     * Dispatches a removeTask action to the app instance
     *
     * @param {Object} task
     * @return {void}
     */
    removeItem: function(task) {
        this.props.app.executeAction('removeTask', task);
    },

    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
    render: function() {
        var me = this,
            tasks = this.state.tasks;

        if (tasks.length === 0) return <h3>No tasks. Just hanging.</h3>;

        return (
            <ol>
                {_.map(tasks, function(task) {
                    return <TaskItem key={Hash.MD5(task)}
                                     task={task}
                                     handleSave={me.saveItem}
                                     handleRemove={me.removeItem} />;
                })}
            </ol>
        );
    }
});