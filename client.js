'use strict';

var app = require('./app'),
    React = require('react'),
    Main = React.createFactory(require('./components/Main.jsx'));

React.render(Main({world: 'React (from browser)', startTimer: true}), document.getElementById('reactRoot'));

//Expose the app instance.
window.App = app;