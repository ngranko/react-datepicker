var React = require('react');
var OnClickOutside = require('react-onclickoutside');
var Datepicker = require('./Datepicker');

var App = OnClickOutside(React.createClass({
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
        var isDateInstantiated = this.state.selectedDate instanceof Date;
        return (
            <div onFocus={this.focusHandler}>
                <input type="text" value={isDateInstantiated ? this.state.selectedDate.toLocaleDateString() : ''} readOnly />
                {this.state.datepickerShown && <Datepicker onSelect={this.clickHandler} currentSelection={this.state.selectedDate} />}
            </div>
        );
    }
}));

module.exports = App;
