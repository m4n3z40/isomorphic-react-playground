var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            done: false,
            description: ''
        }
    },

    render: function() {
        var props = this.props,
            completed = props.completed,
            description = props.description,
            taskContent,
            button;

        if (props.editing) {
            taskContent = <input type="text" value={description} />;
            button = <button>Save</button>
        } else {
            taskContent = description;
            button = <button>Edit</button>;
        }

        return (
            <li class={completed ? 'done' : 'pending'}>
                <input type="radio" checked={completed} />
                {taskContent}
                {button}
            </li>
        );
    }
});