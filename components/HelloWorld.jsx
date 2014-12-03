'use strict';

var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            hello: 'Hello',
            world: 'World'
        };
    },

    render: function() {
        return (
            <h3>{this.props.hello} {this.props.world}</h3>
        );
    }
});