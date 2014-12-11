var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <footer>
                <textarea placeholder="Describe a task here" />
                <button>Add task</button>
            </footer>
        );
    }
});