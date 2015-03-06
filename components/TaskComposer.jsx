var React = require('react');

var ENTER_KEY = 13;

module.exports = React.createClass({
    /**
     * Returns the initial props for this component
     *
     * @return {Object}
     */
    getDefaultProps: function() {
        return {placeholder: 'Describe a task'};
    },

    /**
     * Checks if the Enter key has been pressed and creates a task if it has
     *
     * @param {SyntheticEvent} e
     * @return {void}
     */
    handleKeyDown: function(e) {
        if (e.keyCode === ENTER_KEY) {
            this.createTask();
        }
    },

    /**
     * Dispatches an action for crating a task and resets the state value
     *
     * @return {void}
     */
    createTask: function() {
        var input = this.refs.txtTask.getDOMNode();

        this.props.app.executeAction('createTask', input.value);

        input.value = '';
    },

    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
    render: function() {
        return (
            <footer>
                <input type="text" ref="txtTask" placeholder={this.props.placeholder} onKeyUp={this.handleKeyDown} />
                <button onClick={this.createTask}>Add task</button>
            </footer>
        );
    }
});