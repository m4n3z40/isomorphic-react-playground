var React = require('react');

var SPACE_KEY = 13;

module.exports = React.createClass({
    getDefaultProps: function() {
        return {task: null};
    },

    getInitialState: function() {
        var task = this.props.task;

        return {text: task.text, editing: task.editing};
    },

    removeTask: function() {
        if (this.props.handleRemove) {
            this.props.handleRemove(this.props.task);
        }
    },

    saveTask: function() {
        if(this.props.handleSave) {
            var task = this.props.task;

            this.props.handleSave({
                id: task.id,
                text: this.state.text,
                editing: false
            });
        }
    },

    completeTask: function() {
        if(this.props.handleSave) {
            var task = this.props.task;

            this.props.handleSave({
                id: task.id,
                completed: !task.completed
            });
        }
    },

    editTask: function() {
        this.props.task.editing = true;

        this.setState({editing: true});
    },

    handleEditFieldChange: function(e) {
        this.setState({text: e.target.value});
    },

    handleEditFieldKeyDown: function(e) {
        if (e.keyCode === SPACE_KEY) {
            this.saveTask();
        }
    },

    handleCancelEditing: function() {
        var task = this.props.task;

        task.editing = false;

        this.setState({text: task.text, editing: false});
    },

    render: function() {
        var task = this.props.task,
            completed = task.completed,
            editing = task.editing,
            text = this.state.text,
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