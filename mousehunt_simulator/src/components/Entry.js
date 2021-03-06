import {huntResult, huntEntry, chooseBGColor} from './operations';

function Entry(props) {
    console.log(props.table)
    let result = huntResult(props.table);
    return (
        <div className="entry" id={chooseBGColor(result)}>
            <p>Hunt #{`${props.huntno} ${props.table.location}`}</p>
            <p>{huntEntry(result, props.table)}</p>
        </div>
    );
}

export default Entry;