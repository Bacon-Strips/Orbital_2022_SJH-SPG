import {huntResult, huntEntry, chooseBGColor} from './operations';
import './Entry.css';

function Entry(props) {
    let result = huntResult(props.table);
    return (
        <div className="entry" id={chooseBGColor(result)}>
            <p>Hunt #{`${props.huntno}`}</p>
            <p>{huntEntry(result, props.table)}</p>
        </div>
    );
}

export default Entry;