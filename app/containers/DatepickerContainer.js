var React = require('react');
var Datepicker = require('../components/Datepicker');

var DatepickerContainer = React.createClass({
    propTypes: {
        onDateClick: React.PropTypes.func.isRequired,
        currentSelection: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            selectedYear: new Date().getFullYear(),
            selectedMonth: new Date().getMonth()
        };
    },

    componentWillMount: function() {
        if (this.props.currentSelection instanceof Date) {
            this.setState({
                selectedYear: this.props.currentSelection.getFullYear(),
                selectedMonth: this.props.currentSelection.getMonth()
            });
        }
    },

    incrementMonth: function() {
        var newMonth = this.state.selectedMonth + 1;
        var newState = {};
        if (newMonth > 11) {
            newState.selectedMonth = 0;
            newState.selectedYear = this.state.selectedYear + 1;
        } else {
            newState.selectedMonth = newMonth;
        }

        this.setState(newState);
    },

    decrementMonth: function() {
        var newMonth = this.state.selectedMonth - 1;
        var newState = {};
        if (newMonth < 0) {
            newState.selectedMonth = 11;
            newState.selectedYear = this.state.selectedYear - 1;
        } else {
            newState.selectedMonth = newMonth;
        }

        this.setState(newState);
    },

    render: function() {
        return (
            <Datepicker
                decrementMonthClickHandler={this.decrementMonth}
                incrementMonthClickHandler={this.incrementMonth}
                selectedMonth={this.state.selectedMonth}
                selectedYear={this.state.selectedYear}
                currentSelection={this.props.currentSelection}
                onDateClick={this.props.onDateClick}
            />
        );
    }
});

module.exports = DatepickerContainer;
