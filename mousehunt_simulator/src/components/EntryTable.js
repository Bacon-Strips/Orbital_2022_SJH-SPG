import { doc, getDoc } from "firebase/firestore";

import {DataTable} from './operations';
import { db } from '../firebase-config';
import Entry from "./Entry";

function EntryTable(props) {

    const test = async () => {
        const docRef = doc(db, 'Meadow', 'Mice Pool');
        const stuff = await getDoc(docRef);
        const cheese = Object.entries(stuff.data())
        return cheese.map((cheese) => cheese[[0]]);
    }

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