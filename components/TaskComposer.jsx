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
     * Returns the initial state object for this component
     *
     * @return {Object}
     */
    getInitialState: function() {
        return {value: ''};
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
     * Changes the state value whenever the text in the input changes
     *
     * @param {SyntheticEvent} e
     * @return {void}
     */
    handleTextChange: function(e) {
        this.setState({value: e.target.value});
    },

    /**
     * Dispatches an action for crating a task and resets the state value
     *
     * @return {void}
     */
    createTask: function() {
        this.props.app.executeAction('createTask', this.state.value);

        this.setState({value: ''});
    },

    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
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