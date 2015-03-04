var React = require('react');

var ENTER_KEY = 13;

module.exports = React.createClass({
    /**
     * Returns the initial props for this component
     *
     * @return {Object}
     */
    getDefaultProps: function() {
        return {task: null};
    },

    /**
     * Returns the initial state object for this component
     *
     * @return {Object}
     */
    getInitialState: function() {
        var task = this.props.task;

        return {text: task.text, editing: task.editing, completed: task.completed};
    },

    /**
     * Delegates the removing of a task to the parent by the handler in the props
     *
     * @return {void}
     */
    removeTask: function() {
        if (this.props.handleRemove) {
            this.props.handleRemove(this.props.task);
        }
    },

    /**
     * Delegates the update of a task to the parent by the handler in the props
     *
     * @return {void}
     */
    saveTask: function() {
        if(this.props.handleSave) {
            this.props.handleSave({
                id: this.props.task.id,
                text: this.state.text
            });
        }
    },

    /**
     * Delegates the update of a task to the parent by the handler in the props
     *
     * @return {void}
     */
    completeTask: function() {
        if(this.props.handleSave) {
            var task = this.props.task;

            this.props.handleSave({
                id: task.id,
                completed: !task.completed
            });
        }
    },

    /**
     * Changes the state of a task for editing
     *
     * @return {void}
     */
    editTask: function() {
        this.setState({editing: true});
    },

    /**
     * Updates the text for state with the text being entered by the user
     *
     * @param {SyntheticEvent} e
     * @return {void}
     */
    handleEditFieldChange: function(e) {
        this.setState({text: e.target.value});
    },

    /**
     * Checks if the Enter key has been pressed and saves the task if it has
     *
     * @param {SyntheticEvent} e
     * @return {void}
     */
    handleEditFieldKeyDown: function(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTask();
        }
    },

    /**
     * Cancels the editing, changing the state of the component
     *
     * @return {void}
     */
    handleCancelEditing: function() {
        var task = this.props.task;

        task.editing = false;

        this.setState({text: task.text, editing: false});
    },

    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
    render: function() {
        var task = this.state,
            completed = task.completed,
            editing = task.editing,
            text = task.text,
            buttons = [],
            taskContent;

        if (editing) {
            taskContent = <input type="text" value={text} onChange={this.handleEditFieldChange} onKeyDown={this.handleEditFieldKeyDown}  />;
            buttons.push(<button key="cancel" onClick={this.handleCancelEditing}>Cancel</button>);
            buttons.push(<button key="save" onClick={this.saveTask}>Save</button>);
        } else {
            taskContent = text;
            buttons.push(<button key="remove" onClick={this.removeTask}>Remove</button>);
            buttons.push(<button key="edit" onClick={this.editTask}>Edit</button>);
        }

        return (
            <li className={completed ? 'done' : 'pending'}>
                <label>
                    <input type="checkbox" checked={completed} className={editing ? 'hidden' : ''}
                        onChange={this.completeTask} />
                    {taskContent}
                </label>
                {buttons}
            </li>
        );
    }
});