var app = require('./app'),
    React = require('react');

app.restoreState(window.__serverState);

React.render(
    app.getMainComponent()({app: app, tasks: app.getStore('TasksStore').getAll()}),
    document.getElementById('reactRoot')
);

//Expose the app instance.
window.App = app;