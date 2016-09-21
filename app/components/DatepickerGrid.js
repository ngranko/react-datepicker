var React = require('react');
var fetch = require('node-fetch');
var styles = require('../css/DatepickerGrid.css');
var DatepickerItemContainer = require('../containers/DatepickerItemContainer');
var settings = require('../settings/settings');

var DatepickerGrid = React.createClass({
    propTypes: {
        year: React.PropTypes.number.isRequired,
        month: React.PropTypes.number.isRequired,
        onDateClick: React.PropTypes.func.isRequired,
        currentSelected: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            reservedDays: []
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.props.month != nextProps.month) {
            this.getReservedDays(nextProps.year, nextProps.month);
            return true;
        }
        return false;
    },

    componentWillMount: function() {
        this.getReservedDays(this.props.year, this.props.month);
    },

    getReservedDays: function(year, month) {
        fetch(settings.apiHost + '/GetReservedDays/' + year + '/' + (month + 1))
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('Response is not ok');
                    return '[]';
                }
            }).then(function(json) {
                this.setState({reservedDays: JSON.parse(json)});
            }.bind(this));
    },

    normalizeDay: function(date) {
        var day = date.getDay() != 0 ? date.getDay() : 0;
        return day - 1;
    },

    createSelectedDate: function(e) {
        var selectedDate = parseInt(e.target.innerHTML);
        if (this.state.reservedDays.indexOf(selectedDate) > -1) {
            return;
        }
        this.props.onDateClick(new Date(this.props.year, this.props.month, e.target.innerHTML));
    },

    getFullCalendarGrid: function() {
        var calendarCells = this.getCalendarCellsList();

        var contents = [];
        while (calendarCells.length > 0) {
            contents.push(<tr>{calendarCells.splice(0, 7)}</tr>);
        }
        return contents;
    },

    getCalendarCellsList: function() {
        var date = new Date(this.props.year, this.props.month);
        var calendarCells = this.getEmptyCellsBeforeMonthStart(this.normalizeDay(date));
        calendarCells = calendarCells.concat(this.getDayItems(date));
        return this.getEmptyCellsAfterMonthEnd(calendarCells);
    },

    getEmptyCellsBeforeMonthStart: function(day) {
        var cellsArray = [];
        for (var i = 0; i < day; i++) {
            cellsArray.push(<DatepickerItemContainer />);
        }
        return cellsArray;
    },

    getDayItems: function(date) {
        var hasSelection = this.props.currentSelected instanceof Date &&
            this.props.currentSelected.getMonth() == this.props.month;
        var cellsArray = [];

        while (date.getMonth() == this.props.month) {
            var isSelected = hasSelection && date.toDateString() == this.props.currentSelected.toDateString();
            var isToday = date.toDateString() == new Date().toDateString();
            var isReserved = this.state.reservedDays.indexOf(date.getDate()) > -1;
            cellsArray.push(
                <DatepickerItemContainer
                    date={date.getDate()}
                    clickHandler={this.createSelectedDate}
                    isToday={isToday}
                    reserved={isReserved}
                    selected={isSelected}
                />
            );
            date.setDate(date.getDate() + 1);
        }

        return cellsArray;
    },

    getEmptyCellsAfterMonthEnd: function(cellsArray) {
        while (cellsArray.length % 7 != 0) {
            cellsArray.push(<DatepickerItemContainer />);
        }
        return cellsArray;
    },

    render: function() {
        var contents = this.getFullCalendarGrid();

        return (
            <table className={styles.calendar}>
                <thead>
                <tr>
                    <td className={styles.headCell}>Mo</td>
                    <td className={styles.headCell}>Tu</td>
                    <td className={styles.headCell}>We</td>
                    <td className={styles.headCell}>Th</td>
                    <td className={styles.headCell}>Fr</td>
                    <td className={styles.headCell}>Sa</td>
                    <td className={styles.headCell}>Su</td>
                </tr>
                </thead>
                <tbody>
                    {contents}
                </tbody>
            </table>
        );
    }
});

module.exports = DatepickerGrid;
