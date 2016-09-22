var React = require('react');
var styles = require('../css/Datepicker.css');
var DatepickerGridContainer = require('../containers/DatepickerGridContainer');

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function Datepicker(props) {
    return (
        <div className={styles.datepickerPopupBody}>
            <div className={styles.header}>
                <button onClick={props.decrementMonthClickHandler}>&lt;</button>
                <div className={styles.currentMonthName}>
                    {monthNames[props.selectedMonth]} {props.selectedYear}
                </div>
                <button className={styles.buttonNext} onClick={props.incrementMonthClickHandler}>&gt;</button>
            </div>
            <DatepickerGridContainer
                year={props.selectedYear}
                month={props.selectedMonth}
                currentSelected={props.currentSelection}
                onDateClick={props.onDateClick}
            />
        </div>
    );
}

Datepicker.propTypes = {
    decrementMonthClickHandler: React.PropTypes.func.isRequired,
    incrementMonthClickHandler: React.PropTypes.func.isRequired,
    selectedMonth: React.PropTypes.number.isRequired,
    selectedYear: React.PropTypes.number.isRequired,
    onDateClick: React.PropTypes.func.isRequired,
    currentSelection: React.PropTypes.object.isRequired
};

module.exports = Datepicker;
