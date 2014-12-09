'use strict';

var React = require('react'),
    Application = require('./lib/core/application'),
    TaskStore = require('./stores/tasks'),
    mainComponent = require('./components/Main.jsx');

//This will be de app instance, available everywhere
var app = new Application();

app.setMainComponent(React.createFactory(mainComponent));

app.addStore(new TaskStore());

module.exports = app;