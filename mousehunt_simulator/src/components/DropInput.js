function DropInput(props) {
    function handleInputChange(event) {
        props.updateState(event.target.value);
    }
    return (
        <select onChange={handleInputChange} value={props.value}>
            {props.options.map((x, index) => {
                return <option key={index} value={x}>{x}</option>
            })}
        </select>
    );
}

/**
 * Required props:
 * props.Purpose        {String}    Purpose of this FillInput
 * props.options        {arr}       Array of options for the DropInput
 * props.updateState    {function}  Function to pass data to parent class
 */

export default DropInput;