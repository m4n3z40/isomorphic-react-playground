var React = require('react/addons');

module.exports = React.createClass({
    /**
     * Components mixins
     */
    mixins: [React.addons.PureRenderMixin],

    /**
     * Returns the initial props for this component
     *
     * @return {Object}
     */
    getDefaultProps: function() {
        return {
            item: null
        };
    },

    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
    render: function() {
        var item = this.props.item;

        return (
            <li>
                <a href={item.url}>{item.title}</a>
                <span>(Points: {item.points})</span>
            </li>
        );
    }
});