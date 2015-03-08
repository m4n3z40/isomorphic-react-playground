var React = require('react'),
    Router = require('react-router'),
    App = require('./components/App.jsx'),
    TasksPage = require('./components/TasksPage.jsx'),
    TweetsPage = require('./components/TweetsPage.jsx'),
    HackerNewsPage = require('./components/HackerNewsPage.jsx'),
    Route = Router.Route,
    NotFoundRoute = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute;

module.exports = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={TasksPage}/>
        <Route name="tweets" path="tweets" handler={TweetsPage}/>
        <Route name="hackernews" path="hackernews" handler={HackerNewsPage}/>
    </Route>
);