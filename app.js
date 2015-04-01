require('es6-promise').polyfill();
require('isomorphic-fetch');

var Application = require('./lib/core/application'),
    TaskStore = require('./stores/tasks'),
    HackerNewsStore = require('./stores/hackernews');

//This will be de app instance, available everywhere
var app = new Application();

//Setting the routes
app.setRoutes(require('./routes.jsx')(app));

//Adding the app services
app.addService(require('./services/tasks')(app));
app.addService(require('./services/hackernews')(app));

//Adding the app stores
app.addStore(new TaskStore());
app.addStore(new HackerNewsStore());

//Adding the app actions
app.addAction(require('./actions/tasks/create'));
app.addAction(require('./actions/tasks/remove'));
app.addAction(require('./actions/tasks/update'));
app.addAction(require('./actions/tasks/show'));
app.addAction(require('./actions/tasks/filter'));
app.addAction(require('./actions/hackernews/search'));

module.exports = app;