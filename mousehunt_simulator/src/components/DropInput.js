function DropInput(props) {
    function handleInputChange(event) {
        props.updateState(event.target.value);
    }
    return (
        <label className={props.Purpose}>
            {props.Purpose}
            <select onChange={handleInputChange}>
                {props.options.map(x => {
                    return <option value={x}>{x}</option>
                })}
            </select>
        </label>
    );
}

/**
 * Required props:
 * props.Purpose        {String}    Purpose of this FillInput
 * props.options        {arr}       Array of options for the DropInput
 * props.updateState    {function}  Function to pass data to parent class
 */

export default DropInput;