import {useState} from 'react';
import DropInput from './DropInput';
import FillInput from './FillInput';
import {locations, cheeses, powertypes} from './InputOptions'

function ControlPanel(props) {
    /*
    const [power, setPower] = useState(0);
    const [luck, setLuck] = useState(0);
    const [powertype, setPowertype] = useState(' ');
    const [cheese, setCheese] = useState(' ');
    const [location, setLocation] = useState(' ');
    const [numHunts, setHunts] = useState(0);
    **/
    
    return (
        <div className='controls'>
            <DropInput Purpose={'Locations'} value={props.location} options={locations} updateState={props.setLocation}/>
            <DropInput Purpose={'Cheese'} value={props.cheese} options={cheeses[props.location]} updateState={props.setCheese}/>
            <DropInput Purpose={'Power Type'} value={props.powerType} options={powertypes} updateState={props.setPowerType}/>
            <FillInput Purpose={'Power'} value={props.power}updateState={props.setPower}/>
            <FillInput Purpose={'Luck'} value={props.luck} updateState={props.setLuck}/>
            <FillInput Purpose={'No. of Hunts'} value={props.numHunts} updateState={props.setHunts}/>
        </div>
    );
}

export default ControlPanel;