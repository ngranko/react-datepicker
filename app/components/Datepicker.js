var React = require('react');
var styles = require('../css/Datepicker.css');
var DatepickerGrid = require('./DatepickerGrid');

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var Datepicker = React.createClass({
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
            <div className={styles.datepickerPopupBody}>
                <div className={styles.header}>
                    <button onClick={this.decrementMonth}>&lt;</button>
                    <div className={styles.currentMonthName}>
                        {monthNames[this.state.selectedMonth]} {this.state.selectedYear}
                    </div>
                    <button className={styles.buttonNext} onClick={this.incrementMonth}>&gt;</button>
                </div>
                <DatepickerGrid
                    year={this.state.selectedYear}
                    month={this.state.selectedMonth}
                    currentSelected={this.props.currentSelection}
                    onDateClick={this.props.onDateClick}
                />
            </div>
        );
    }
});

module.exports = Datepicker;
