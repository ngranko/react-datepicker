var React = require('react');
var OnClickOutside = require('react-onclickoutside');
var App = require('../components/App');

var AppContainer = OnClickOutside(React.createClass({
    getInitialState: function() {
        return {
            selectedDate: {},
            datepickerShown: false
        };
    },

    focusHandler: function() {
        this.setState({
            datepickerShown: true
        });
    },

    clickHandler: function(date) {
        this.setState({
            datepickerShown: false,
            selectedDate: date
        });
    },

    handleClickOutside: function() {
        this.setState({
            datepickerShown: false
        });
    },

    render: function() {
        return (
            <App
                focusHandler={this.focusHandler}
                clickHandler={this.clickHandler}
                selectedDate={this.state.selectedDate}
                datepickerShown={this.state.datepickerShown}
            />
        );
    }
}));

module.exports = AppContainer;
