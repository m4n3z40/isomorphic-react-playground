'use strict';

var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            hello: 'Hello',
            world: 'World'
        };
    },

    getInitialState: function() {
        return {
            secondsElapsed: 0
        }
    },

    render: function() {
        return (
            <div>
                <h3>{this.props.hello} {this.props.world}</h3>
                <p>You've been here for {this.state.secondsElapsed} seconds.</p>
            </div>
        );
    }
});