import {useState} from 'react';
import DropInput from './DropInput';
import FillInput from './FillInput';
import {locations, cheeses, powertypes} from './InputOptions'

function ControlPanel(props) {
    const [power, setPower] = useState(0);
    const [luck, setLuck] = useState(0);
    const [powertype, setPowertype] = useState(' ');
    const [cheese, setCheese] = useState(' ');
    const [location, setLocation] = useState(' ');
    
    return (
        <div className='controls'>
            <DropInput Purpose={'Locations'} options={locations} updateState={setLocation}/>
            <DropInput Purpose={'Cheese'} options={cheeses[location]} updateState={setCheese}/>
            <DropInput Purpose={'Power Type'} options={powertypes} updateState={setPowertype}/>
            <FillInput Purpose={'Power'} updateState={setPower}/>
            <FillInput Purpose={'Luck'} updateState={setLuck}/>
        </div>
    );
}

export default ControlPanel;