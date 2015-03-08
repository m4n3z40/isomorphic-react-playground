var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <header>
                    <ul>
                        <li><Link to="app">Tasks</Link></li>
                        <li><Link to="tweets">Tweets</Link></li>
                        <li><Link to="hackernews">Hacker News</Link></li>
                    </ul>
                </header>
                <RouteHandler {...this.props}/>
            </div>
        );
    }
});