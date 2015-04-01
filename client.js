var app = require('./app');

app.restoreState(window.__serverState);

app.renderClient(document.getElementById('reactRoot'));