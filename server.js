//Install JSX runtime compilation
require('node-jsx').install({extension: '.jsx'});

//Dependencies
var express = require('express');
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

//Respondes the favicon icon, cannot let react router handle this
serverApp.get('/favicon.ico', function(req, res) {
    //TODO: get a favicon to work
    res.status(404).end();
});

//Gets app module
var app = require('./app');

//Sets the default route handler
serverApp.get('*', function(req, res) {
    //Instatiates and configure application for each session
    var App = app();

    //Gets the app config
    var appConfig = App.config('app');

    App.renderServer(req.url, null, function(content) {
        res.render('layouts/default', {
            language: appConfig.defaultLanguage,
            pageTitle: appConfig.siteTitle,
            content: content,
            state: JSON.stringify(App.saveState())
        });
    });
});

//Gets the server config
var serverConfig = require('./configs/server')[process.env.NODE_ENV || 'development'];

//Start the server
var server = serverApp.listen(serverConfig.port, serverConfig.address, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Started server at http://%s:%s', host, port);
});