var React = require('react');
var DatepickerContainer = require('../containers/DatepickerContainer');


function App(props) {
    var isDateInstantiated = props.selectedDate instanceof Date;
    return (
        <div onFocus={props.focusHandler}>
            <input
                type="text"
                value={isDateInstantiated ? props.selectedDate.toLocaleDateString() : ''}
                readOnly
            />
            {props.datepickerShown && <DatepickerContainer
                onDateClick={props.clickHandler}
                currentSelection={props.selectedDate}
            />}
        </div>
    );
}

App.propTypes = {
    focusHandler: React.PropTypes.func.isRequired,
    selectedDate: React.PropTypes.object,
    datepickerShown: React.PropTypes.bool,
    clickHandler: React.PropTypes.func.isRequired
};

module.exports = App;
