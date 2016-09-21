var React = require('react');
var styles = require('../css/DatepickerItem.css');
var DatepickerItem = require('../components/DatepickerItem');

var DatepickerItemContainer = React.createClass({
    propTypes: {
        date: React.PropTypes.number,
        isToday: React.PropTypes.bool,
        clickHandler: React.PropTypes.func,
        reserved: React.PropTypes.bool,
        selected: React.PropTypes.bool
    },

    getInitialState: function() {
        return {
            hovered: false
        };
    },

    getDefaultProps: function() {
        return {
            date: 0,
            isToday: false
        };
    },

    mouseEnterHandler: function() {
        this.setState({
            hovered: true
        });
    },

    mouseLeaveHandler: function() {
        this.setState({
            hovered: false
        });
    },

    getClassName: function () {
        var className = 'calendarCell';

        if (this.props.date != 0) {
            if (this.props.selected) {
                className = this.state.hovered ? 'hoveredSelectedCalendarCell' : 'selectedCalendarCell';
            } else if (this.props.reserved && this.props.isToday) {
                className = 'disabledTodayCalendarCell';
            } else if (this.props.reserved) {
                className = 'disabledCalendarCell';
            } else if (this.props.isToday) {
                className = 'todayCalendarCell';
            } else {
                className = this.state.hovered ? 'hoveredCalendarCell' : 'validCalendarCell';
            }
        }

        return className;
    },

    render: function() {
        return <DatepickerItem
            name={this.getClassName()}
            date={this.props.date}
            clickHandler={this.props.clickHandler}
            mouseEnterHandler={this.mouseEnterHandler}
            mouseLeaveHandler={this.mouseLeaveHandler}
        />;
    }
});

module.exports = DatepickerItemContainer;
