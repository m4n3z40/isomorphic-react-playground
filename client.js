'use strict';

var app = require('./app'),
    React = require('react');

React.render(
    app.getMainComponent()({app: app}),
    document.getElementById('reactRoot')
);

//Expose the app instance.
window.App = app;