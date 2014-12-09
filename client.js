'use strict';

var app = require('./app'),
    React = require('react');

React.render(
    app.getMainComponent()({world: 'React (from browser)', startTimer: true}),
    document.getElementById('reactRoot')
);

//Expose the app instance.
window.App = app;