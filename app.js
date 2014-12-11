'use strict';

var React = require('react'),
    Application = require('./lib/core/application'),
    TaskStore = require('./stores/tasks'),
    mainComponent = require('./components/Main.jsx');

//This will be de app instance, available everywhere
var app = new Application();

app.setMainComponent(React.createFactory(mainComponent));

app.addStore(new TaskStore());

app.addAction(require('./actions/create-task'));
app.addAction(require('./actions/remove-task'));
app.addAction(require('./actions/update-task'));
app.addAction(require('./actions/show-tasks'));
app.addAction(require('./actions/filter-tasks'));

module.exports = app;