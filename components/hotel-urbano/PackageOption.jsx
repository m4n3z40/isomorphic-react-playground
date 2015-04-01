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
            option: null
        };
    },

    /**
     * Handler for the option click
     *
     * @param {SyntheticEvent} e
     * @return {void}
     */
    onOptionClick: function(e) {
        var props = this.props;

        e.preventDefault();

        props.onOptionClick(props.option);
    },

    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
    render: function() {
        var option = this.props.option;

        return (
            <li>
                <a href="" onClick={this.onOptionClick}>
                    <img src={option.image} alt={option.call}/>
                    <div>{option.title}</div>
                    <div>{option.call}</div>
                    <div>{option.people} {option.people > 1 ? 'pessoa' : 'pessoas'}</div>
                    <div>{option.duration}</div>
                    <div>Was: BRL {option.price.price}</div>
                    <div>Now: BRL {option.salePrice.price}</div>
                </a>
            </li>
        );
    }
});