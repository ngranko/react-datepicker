var React = require('react');
var styles = require('../css/DatepickerGrid.css');

function DatepickerGrid(props) {
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
                {props.children}
            </tbody>
        </table>
    );
}

module.exports = DatepickerGrid;
