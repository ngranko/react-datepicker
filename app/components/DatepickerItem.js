var React = require('react');
var styles = require('../css/DatepickerItem.css');

var DatepickerItem = React.createClass({
    propTypes: {
        date: React.PropTypes.number,
        isToday: React.PropTypes.bool,
        onClick: React.PropTypes.func,
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

    mouseOverHandler: function() {
        this.setState({
            hovered: true
        });
    },

    mouseOutHandler: function() {
        this.setState({
            hovered: false
        });
    },

    getClassName: function () {
        var className = styles.calendarCell;

        if (this.props.date != 0) {
            if (this.props.selected) {
                className = this.state.hovered ? styles.hoveredSelectedCalendarCell : styles.selectedCalendarCell;
            } else if (this.props.reserved && this.props.isToday) {
                className = styles.disabledTodayCalendarCell;
            } else if (this.props.reserved) {
                className = styles.disabledCalendarCell;
            } else if (this.props.isToday) {
                className = styles.todayCalendarCell;
            } else {
                className = this.state.hovered ? styles.hoveredCalendarCell : styles.validCalendarCell;
            }
        }

        return className;
    },

    render: function() {
        return (
            <td className={this.getClassName()} onClick={this.props.onClick} onMouseEnter={this.mouseOverHandler} onMouseLeave={this.mouseOutHandler}>
                {this.props.date != 0 && this.props.date}
            </td>
        );
    }
});

module.exports = DatepickerItem;
