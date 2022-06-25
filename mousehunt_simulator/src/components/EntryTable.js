import {DataTable} from './operations';
import Entry from "./Entry";
import {useState} from 'react';

function EntryTable(props) {
    let table = new DataTable(props.cheese, props.power, props.luck, props.powerType, props.location);
    
    let entries = [];
    for (let i = 1; i <= props.huntTill; i++) {
        entries.push(<Entry table={table} huntno = {i} key={i} />)
    }
    return (
    <div className='EntryTable'>
        {entries}
    </div>
    ); 
}

export default EntryTable;