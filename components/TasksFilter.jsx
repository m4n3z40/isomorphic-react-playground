var React = require('react');

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
            textFilter: this.props.byText
        };
    },

    handleShowCompletedChange: function() {
        var hideCompleted = !this.state.hideCompleted;

        this.props.app.executeAction('filterTasks', {
            hideCompleted: hideCompleted,
            byText: this.state.textFilter
        });

        this.setState({hideCompleted: hideCompleted});
    },

    handleTextFilterChange: function(e) {
        var text = e.target.value;

        this.props.app.executeAction('filterTasks', {
            hideCompleted: this.state.hideCompleted,
            byText: text
        });

        this.setState({textFilter: text});
    },

    clearTextFilter: function() {
        this.setState({textFilter: ''});
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