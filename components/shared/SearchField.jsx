var React = require('react/addons'),
    _ = require('lodash');

module.exports = React.createClass({
    /**
     * Returns the initial props for this component
     *
     * @return {Object}
     */
    getDefaultProps: function() {
        return {
            placeHolder: 'search...',
            text: '',
            minChars: 3,
            label: '',
            id: _.uniqueId('sf_')
        };
    },

    /**
     * Returns the initial state object for this component
     *
     * @return {Object}
     */
    getInitialState: function() {
        var props = this.props;

        return {
            placeHolder: props.placeHolder,
            text: props.text
        };
    },

    /**
     * handles the change on the text field
     *
     * @param {SyntheticEvent} e
     * @return {void}
     */
    onInputChange: function(e) {
        var text = e.target.value,
            props = this.props;

        this.setState({text: text});

        if (text.length >= props.minChars && props.onSearchIntent) {
            props.onSearchIntent(text);
        }
    },

    /**
     * Resets the text field
     *
     * @return {void}
     */
    clearTextFilter: function() {
        this.setState({text: ''});
    },

    /**
     * Renders the content of the component and its children
     *
     * @return {XML}
     */
    render: function() {
        var props = this.props,
            state = this.state,
            labelComponent = props.label ? <label for={props.id}>{props.label}</label> : null;

        return (
            <div>
                {labelComponent}
                <input type="search" id={props.id} value={state.text}
                       placeholder={props.placeHolder} onChange={this.onInputChange}/>
            </div>
        );
    }
});