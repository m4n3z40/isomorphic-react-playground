require('es6-promise').polyfill();
require('isomorphic-fetch');

var React = require('react'),
    Application = require('./lib/core/application'),
    TaskStore = require('./stores/tasks'),
    mainComponent = require('./components/Main.jsx');

//This will be de app instance, available everywhere
var app = new Application();

app.setMainComponent(React.createFactory(mainComponent));

app.addService(require('./services/tasks')(app));

app.addStore(new TaskStore());

app.addAction(require('./actions/createTask'));
app.addAction(require('./actions/removeTask'));
app.addAction(require('./actions/updateTask'));
app.addAction(require('./actions/showTasks'));
app.addAction(require('./actions/filterTasks'));

module.exports = app;