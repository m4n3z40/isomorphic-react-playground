var React = require('react'),
    Router = require('react-router'),
    RootPage = require('./components/RootPage.jsx'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

module.exports = function(App) {
    var TasksPage = require('./components/TasksPage.jsx')(App),
        HotelUrbanoPage = require('./components/HotellUrbanoPage.jsx')(App),
        HackerNewsPage = require('./components/HackerNewsPage.jsx')(App);

    return (
        <Route name="app" path="/" handler={RootPage}>
            <DefaultRoute handler={TasksPage}/>
            <Route name="hotel-urbano" path="hotel-urbano" handler={HotelUrbanoPage}/>
            <Route name="hackernews" path="hackernews" handler={HackerNewsPage}/>
        </Route>
    );
};