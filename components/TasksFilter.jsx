var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <header>
                <label><input type="checkbox" />Show completed?</label>
                <input type="text" placeholder="Filter tasks" />
            </header>
        );
    }
});