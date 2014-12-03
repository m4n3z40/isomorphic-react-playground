'use strict';

var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            hello: 'Hello',
            world: 'World',
            startTimer: false
        };
    },

    getInitialState: function() {
        return {
            secondsElapsed: 0
        }
    },

    tick: function() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    },

    componentDidMount: function() {
        if (this.props.startTimer) {
            this.interval = setInterval(this.tick, 1000);
        }
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
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