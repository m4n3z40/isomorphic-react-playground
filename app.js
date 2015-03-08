require('es6-promise').polyfill();
require('isomorphic-fetch');

var Application = require('./lib/core/application'),
    TaskStore = require('./stores/tasks'),
    routes = require('./routes.jsx');

//This will be de app instance, available everywhere
var app = new Application();

//Setting the routes
app.setRoutes(routes);

//Adding the app services
app.addService(require('./services/tasks')(app));

//Adding the app stores
app.addStore(new TaskStore());

//Adding the app actions
app.addAction(require('./actions/createTask'));
app.addAction(require('./actions/removeTask'));
app.addAction(require('./actions/updateTask'));
app.addAction(require('./actions/showTasks'));
app.addAction(require('./actions/filterTasks'));

module.exports = app;