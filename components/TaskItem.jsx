var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {task: null};
    },

    getInitialState: function() {
        var task = this.props.task;

        return {text: task.text, editing: task.editing};
    },

    onRemoveClick: function() {

    },

    onSaveClick: function() {
        if(this.props.onSaveClick) {
            var task = this.props.task;

            this.props.onSaveClick({
                id: task.id,
                text: this.state.text,
                completed: task.completed,
                editing: false
            });
        }
    },

    onEditClick: function() {
        this.props.task.editing = true;

        this.setState({editing: true});
    },

    onEditFieldChange: function(e) {
        this.setState({text: e.target.value});
    },

    onCancelEditing: function() {
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
            taskContent = <input type="text" value={text} onChange={this.onEditFieldChange}  />;
            buttons.push(<button key="cancel" onClick={this.onCancelEditing}>Cancel</button>);
            buttons.push(<button key="save" onClick={this.onSaveClick}>Save</button>);
        } else {
            taskContent = text;
            buttons.push(<button key="remove" onClick={this.onRemoveClick}>Remove</button>);
            buttons.push(<button key="edit" onClick={this.onEditClick}>Edit</button>);
        }

        return (
            <li className={completed ? 'done' : 'pending'}>
                <label>
                    <input type="checkbox" name="completed" className={editing ? 'hidden' : ''} />
                    {taskContent}
                </label>
                {buttons}
            </li>
        );
    }
});