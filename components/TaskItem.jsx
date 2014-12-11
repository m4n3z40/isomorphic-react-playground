var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            completed: false,
            text: ''
        }
    },

    render: function() {
        var props = this.props,
            completed = props.completed,
            text = props.text,
            taskContent,
            button;

        if (props.editing) {
            taskContent = <input type="text" value={text} />;
            button = <button>Save</button>;
        } else {
            taskContent = text;
            button = <button>Edit</button>;
        }

        return (
            <li className={completed ? 'done' : 'pending'}>
                <label>
                    <input type="checkbox" name="completed" />
                    {taskContent}
                </label>
                {button}
            </li>
        );
    }
});