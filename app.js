require('es6-promise').polyfill();
require('isomorphic-fetch');

var Application = require('./lib/core/application'),
    Routes = require('./routes.jsx'),
    TasksService = require('./services/tasks'),
    HackerNewsService = require('./services/hackernews'),
    TaskStore = require('./stores/tasks'),
    HackerNewsStore = require('./stores/hackernews'),
    createTaskAction = require('./actions/tasks/create'),
    removeTaskAction = require('./actions/tasks/remove'),
    updateTaskAction = require('./actions/tasks/update'),
    showTasksAction = require('./actions/tasks/show'),
    filterTasksAction = require('./actions/tasks/filter'),
    searchHackerNewsAction = require('./actions/hackernews/search');

module.exports = function() {
    //This will be de app instance, available everywhere
    var app = new Application();

    //Setting the routes
    app.setRoutes(Routes(app));

    //Adding the app services
    app.addService(TasksService(app));
    app.addService(HackerNewsService(app));

    //Adding the app stores
    app.addStore(new TaskStore());
    app.addStore(new HackerNewsStore());

    //Adding the app actions
    app.addAction(createTaskAction);
    app.addAction(removeTaskAction);
    app.addAction(updateTaskAction);
    app.addAction(showTasksAction);
    app.addAction(filterTasksAction);
    app.addAction(searchHackerNewsAction);

    return app;
};