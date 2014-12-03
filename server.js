require('node-jsx').install({extension: '.jsx'});

var express = require('express');
var app = require('./app');
var React = require('react');

var HelloWorld = require('./components/HelloWorld.jsx');

var serverConfig = app.config('server');

var serverApp = express();

//Configuring the jade view engine at the view directory
serverApp.set('views', './views');
serverApp.set('view engine', 'jade');
serverApp.engine('jade', require('jade').__express);

//Configures the assets static server at the /assets endpoint
serverApp.use('/assets', express.static('assets'));

//Sets the default route handler
serverApp.get('/', function(req, res) {
    res.render('layouts/default', {
        language: 'pt',
        pageTitle: 'Page Title',
        pageContent: React.renderToString(HelloWorld({world:'React'}))
    });
});

//Start the server
var server = serverApp.listen(serverConfig.port, serverConfig.address, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Started server at http://%s:%s', host, port);
});