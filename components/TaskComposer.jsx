var React = require('react');

var SPACE_KEY = 13;

module.exports = React.createClass({
    getDefaultProps: function() {
        return {placeholder: 'Describe a task'};
    },

    getInitialState: function() {
        return {value: ''};
    },

    handleKeyDown: function(e) {
        if (e.keyCode === SPACE_KEY) {
            this.createTask();
        }
    },

    handleTextChange: function(e) {
        this.setState({value: e.target.value});
    },

    createTask: function() {
        this.props.app.executeAction('createTask', this.state.value);

        this.setState({value: ''});
    },

    render: function() {
        return (
            <footer>
                <input type="text" placeholder={this.props.placeholder} value={this.state.value}
                    onChange={this.handleTextChange}
                    onKeyUp={this.handleKeyDown} />
                <button onClick={this.createTask}>Add task</button>
            </footer>
        );
    }
});