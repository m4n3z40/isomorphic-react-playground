var React = require('react'),
    _ = require('lodash');

module.exports = React.createClass({
    /**
     * Returns the initial props for this component
     *
     * @return {Object}
     */
    getDefaultProps: function() {
        return {
            hideCompleted: false,
            byText: ''
        };
    },

    /**
     * Returns the initial state object for this component
     *
     * @return {Object}
     */
    getInitialState: function() {
        return {
            hideCompleted: this.props.hideCompleted,
            byText: this.props.byText
        };
    },

    /**
     * Dispatches a filterTasks action and updates the state of the filters
     *
     * @param {Object} filters
     */
    applyFilters: function(filters) {
        var newState = _.assign({}, this.state, filters);

        this.props.app.executeAction('filterTasks', newState);
        this.setState(newState);
    },

    /**
     * Applies a hideCompleted filter to the tasks list
     *
     * @return {void}
     */
    handleHideCompletedChange: function() {
        this.applyFilters({hideCompleted: !this.state.hideCompleted});
    },

    /**
     * Applies a text filter to the tasks with the text being entered by the user
     *
     * @param {SyntheticEvent} e
     * @return {void}
     */
    handleTextFilterChange: function(e) {
        this.applyFilters({byText: e.target.value});
    },

    /**
     * Resets the text filter
     *
     * @return {void}
     */
    clearTextFilter: function() {
        this.applyFilters({byText: ''});
    },

    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
    render: function() {
        return (
            <header>
                <label>
                    <input type="checkbox" checked={this.state.hideCompleted}
                        onChange={this.handleHideCompletedChange} />Hide completed
                </label>
                <input type="text" placeholder="Filter tasks" value={this.state.byText} onChange={this.handleTextFilterChange} />
                <button onClick={this.clearTextFilter}>Clear</button>
            </header>
        );
    }
});