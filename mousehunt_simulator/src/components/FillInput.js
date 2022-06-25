function FillInput(props) {
    return (
        <label className={props.Purpose}> 
            {props.Purpose}
            <input type="text" onChange={e => props.updateState(parseInt(e.target.value))} placeholder={0}/>
        </label>
    );
}

/**
 * Required props:
 * props.Purpose        {String}    Purpose of this FillInput
 * props.updateState    {function}  Function to pass data to parent class
 */

export default FillInput;