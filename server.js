//Install JSX runtime compilation
require('node-jsx').install({extension: '.jsx'});

//Dependencies
var express = require('express');
var app = require('./app');
var React = require('react');
var bodyParser = require('body-parser');

//Creates the App instance on the server
var serverApp = express();

//Configuring the jade view engine at the view directory
serverApp.set('views', './views');
serverApp.set('view engine', 'jade');
serverApp.engine('jade', require('jade').__express);

//Configuring body parsers
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({extended: true}));

//Configures the assets static server at the /assets endpoint
serverApp.use('/assets', express.static('assets'));

//Configures the api routes
serverApp.use('/api', require('./api/tasks'));

//Gets the app config
var appConfig = app.config('app');

//Gets the component that will render the page content
var Main = app.getMainComponent();

//Sets the default route handler
serverApp.get('/', function(req, res) {
    app.executeAction('showTasks', null, function() {
        res.render('layouts/default', {
            language: appConfig.defaultLanguage,
            pageTitle: appConfig.siteTitle,
            mainComponent: React.renderToString(Main({app: app, tasks: app.getStore('TasksStore').getAll()})),
            state: JSON.stringify(app.saveState())
        });
    });
});

//Gets the server config
var serverConfig = app.config('server');

//Start the server
var server = serverApp.listen(serverConfig.port, serverConfig.address, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Started server at http://%s:%s', host, port);
});