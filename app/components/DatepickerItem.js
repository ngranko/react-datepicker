var React = require('react');
var styles = require('../css/DatepickerItem.css');

function DatepickerItem(props) {
        return (
            <td
                className={styles[props.name]}
                onClick={props.clickHandler}
                onMouseEnter={props.mouseEnterHandler}
                onMouseLeave={props.mouseLeaveHandler}
            >
                {props.date != 0 && props.date}
            </td>
        );
}

DatepickerItem.propTypes = {
    date: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    clickHandler: React.PropTypes.func,
    mouseEnterHandler: React.PropTypes.func,
    mouseLeaveHandler: React.PropTypes.func
};

module.exports = DatepickerItem;
