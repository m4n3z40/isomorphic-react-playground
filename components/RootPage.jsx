var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
    render: function() {
        return (
            <div>
                <header>
                    <ul>
                        <li><Link to="app">Tasks</Link></li>
                        <li><Link to="hackernews">Hacker News</Link></li>
                        <li><Link to="hotel-urbano">Hotel Urbano Packages</Link></li>
                    </ul>
                </header>
                <RouteHandler/>
            </div>
        );
    }
});