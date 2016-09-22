var React = require('react');
var fetch = require('node-fetch');
var DatepickerGrid = require('../components/DatepickerGrid');
var DatepickerItemContainer = require('../containers/DatepickerItemContainer');
var settings = require('../settings/settings');

const DAYS_WEEK = 7;

var DatepickerGridContainer = React.createClass({
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
        var i = 0;
        while (calendarCells.length > 0) {
            contents.push(<tr key={'row_' + i}>{calendarCells.splice(0, DAYS_WEEK)}</tr>);
            i++;
        }
        return contents;
    },

    getCalendarCellsList: function() {
        var date = new Date(this.props.year, this.props.month);
        var calendarCells = this.getEmptyCellsBeforeMonthStart(this.normalizeDay(date));
        calendarCells = calendarCells.concat(this.getDayItems(date));
        return calendarCells.concat(this.getEmptyCellsAfterMonthEnd(this.getNumberOfDaysToAdd(calendarCells.length)));
    },

    // cells before the start of the month will have a month = -1 and day < 0 (they are before a start, after all)
    // cells after the end of the month will have month -1 and day > 0
    getCellKey: function(month, day) {
        return 'cell_' + month + '_' + day;
    },

    getEmptyCellsBeforeMonthStart: function(day) {
        var cellsArray = [];
        for (var i = 0; i < day; i++) {
            cellsArray.push(<DatepickerItemContainer key={this.getCellKey(-1, i - day)} />);
        }
        return cellsArray;
    },

    getDayItems: function(date) {
        var hasSelection = this.props.currentSelected instanceof Date &&
            this.props.currentSelected.getMonth() == this.props.month;
        var cellsArray = [];

        while (date.getMonth() == this.props.month) {
            cellsArray.push(
                <DatepickerItemContainer
                    key={this.getCellKey(date.getMonth(), date.getDate())}
                    date={date.getDate()}
                    clickHandler={this.createSelectedDate}
                    isToday={date.toDateString() == new Date().toDateString()}
                    reserved={this.state.reservedDays.indexOf(date.getDate()) > -1}
                    selected={hasSelection && date.toDateString() == this.props.currentSelected.toDateString()}
                />
            );
            date.setDate(date.getDate() + 1);
        }

        return cellsArray;
    },

    getNumberOfDaysToAdd: function(cellsNumber) {
        return cellsNumber % DAYS_WEEK == 0 ? 0 : DAYS_WEEK - cellsNumber % DAYS_WEEK;
    },

    getEmptyCellsAfterMonthEnd: function(dayDeficit) {
        var cellsArray = [];
        for (var i = 0; i < dayDeficit; i++) {
            cellsArray.push(<DatepickerItemContainer key={this.getCellKey(-1, i)} />);
        }
        return cellsArray;
    },

    render: function() {
        var contents = this.getFullCalendarGrid();

        return (
            <DatepickerGrid>
                {contents}
            </DatepickerGrid>
        );
    }
});

module.exports = DatepickerGridContainer;
