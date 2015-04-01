var React = require('react/addons');

var ENTER_KEY = 13;

module.exports = React.createClass({
    /**
     * Components mixins
     */
    mixins: [React.addons.PureRenderMixin],

    /**
     * Returns the initial props for this component
     *
     * @return {Object}
     */
    getDefaultProps: function() {
        function emptyFn(){}

        return {
            task: null,
            onSave: emptyFn,
            onRemove: emptyFn
        };
    },

    /**
     * @lifecycle
     * @return {void}
     */
    componentDidUpdate: function() {
        if (this.props.task.editing) {
            this.refs.txtTask.getDOMNode().select();
        }
    },

    /**
     * Delegates the removing of a task to the parent by the handler in the props
     *
     * @return {void}
     */
    removeTask: function() {
        this.props.onRemove(this.props.task);
    },

    /**
     * Delegates the update of a task to the parent by the handler in the props
     *
     * @return {void}
     */
    saveTask: function() {
        this.props.onSave({
            id: this.props.task.id,
            text: this.refs.txtTask.getDOMNode().value,
            editing: false
        });
    },

    /**
     * Delegates the update of a task to the parent by the handler in the props
     *
     * @return {void}
     */
    completeTask: function() {
        var task = this.props.task;

        this.props.onSave({
            id: task.id,
            completed: !task.completed
        });
    },

    /**
     * Changes the state of a task for editing
     *
     * @return {void}
     */
    editTask: function() {
        this.props.onSave({
            id: this.props.task.id,
            editing: true
        });
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
        this.props.onSave({
            id: this.props.task.id,
            editing: false
        });
    },

    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
    render: function() {
        var task = this.props.task,
            completed = task.completed,
            editing = task.editing,
            text = task.text,
            buttons = [],
            taskContent;

        if (editing) {
            taskContent = <input type="text" ref="txtTask" defaultValue={text} onKeyDown={this.handleEditFieldKeyDown}  />;
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