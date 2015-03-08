var app = require('./app');

app.restoreState(window.__serverState);

app.renderClient(document.getElementById('reactRoot'), {app: app});

//Expose the app instance.
window.App = app;