var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {value: ''};
    },

    onTextChange: function(e) {
        this.setState({value: e.target.value});
    },

    onAddTask: function() {
        if (this.props.onAddTask) {
            this.props.onAddTask(this.state.value);

            this.setState({value: ''});
        }
    },

    render: function() {
        return (
            <footer>
                <textarea onChange={this.onTextChange} placeholder="Describe a task here" value={this.state.value} />
                <button onClick={this.onAddTask}>Add task</button>
            </footer>
        );
    }
});