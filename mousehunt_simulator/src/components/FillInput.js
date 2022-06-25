function FillInput(props) {
    function isValidNum(num) {
            if (!isNaN(num)) {
                return num;
            }
            return 0;
        }
    return (
        
        <label className={props.Purpose}> 
            {props.Purpose}
            <input  type="number" 
                    value={props.value} 
                    onChange={e => props.updateState(Math.max(isValidNum(parseInt(e.target.value)), 0))} 
                    />
        </label>
    );
}

/**
 * Required props:
 * props.Purpose        {String}    Purpose of this FillInput
 * props.updateState    {function}  Function to pass data to parent class
 */

export default FillInput;