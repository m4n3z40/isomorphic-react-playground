var React = require('react'),
    _ = require('lodash');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            hideCompleted: false,
            byText: ''
        };
    },

    getInitialState: function() {
        return {
            hideCompleted: this.props.hideCompleted,
            byText: this.props.byText
        };
    },

    applyFilters: function(filters) {
        var newState = _.assign({}, this.state, filters);

        this.props.app.executeAction('filterTasks', newState);
        this.setState(newState);
    },

    handleShowCompletedChange: function() {
        this.applyFilters({hideCompleted: !this.state.hideCompleted});
    },

    handleTextFilterChange: function(e) {
        this.applyFilters({byText: e.target.value});
    },

    clearTextFilter: function() {
        this.applyFilters({byText: ''});
    },

    render: function() {
        return (
            <header>
                <label>
                    <input type="checkbox" checked={this.state.hideCompleted}
                        onChange={this.handleShowCompletedChange} />Hide completed
                </label>
                <input type="text" placeholder="Filter tasks" value={this.state.byText} onChange={this.handleTextFilterChange} />
                <button onClick={this.clearTextFilter}>Clear</button>
            </header>
        );
    }
});