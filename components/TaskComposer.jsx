var React = require('react');

var SPACE_KEY = 13;

module.exports = React.createClass({
    getDefaultProps: function() {
        return {placeholder: 'Describe a task'};
    },

    getInitialState: function() {
        return {value: ''};
    },

    onKeyDown: function(e) {
        if (e.keyCode === SPACE_KEY) {
            this.onAddTask();
        }
    },

    onTextChange: function(e) {
        this.setState({value: e.target.value});
    },

    onAddTask: function() {
        this.props.app.executeAction('createTask', this.state.value);

        this.setState({value: ''});
    },

    render: function() {
        return (
            <footer>
                <input type="text" placeholder={this.props.placeholder} value={this.state.value}
                    onChange={this.onTextChange}
                    onKeyUp={this.onKeyDown} />
                <button onClick={this.onAddTask}>Add task</button>
            </footer>
        );
    }
});