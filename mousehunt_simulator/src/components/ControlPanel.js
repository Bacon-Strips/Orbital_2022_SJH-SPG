import {useState} from 'react';
import DropInput from './DropInput';
import FillInput from './FillInput';
import Button from './Button';
import {locations, cheeses, powertypes} from './InputOptions'

function ControlPanel(props) {
    
    const [Controlpower, ControlsetPower] = useState(0);
    const [Controlluck, ControlsetLuck] = useState(0);
    const [ControlpowerType, ControlsetPowerType] = useState(' ');
    const [Controlcheese, ControlsetCheese] = useState(' ');
    const [Controllocation, ControlsetLocation] = useState(' ');
    const [ControlnumHunts, ControlsetHunts] = useState(0);

    function simButton(event) {
        props.setPower(Controlpower);
        props.setLuck(Controlluck);
        props.setPowerType(ControlpowerType);
        props.setCheese(Controlcheese);
        props.setLocation(Controllocation);
        props.setHunts(ControlnumHunts);
    }

    function limitHunts(num) {
        ControlsetHunts(Math.min(500, num));
    }
    
    return (
        <div className='controls'>
            <div className='custom-values'>
                <DropInput Purpose={'Locations'} value={Controllocation} options={locations} updateState={ControlsetLocation}/>
                <DropInput Purpose={'Cheese'} value={Controlcheese} options={cheeses[Controllocation]} updateState={ControlsetCheese}/>
                <DropInput Purpose={'Power Type'} value={ControlpowerType} options={powertypes} updateState={ControlsetPowerType}/>
                <FillInput Purpose={'Power'} value={Controlpower}updateState={ControlsetPower}/>
                <FillInput Purpose={'Luck'} value={Controlluck} updateState={ControlsetLuck}/>
                <FillInput Purpose={'No. of Hunts'} value={ControlnumHunts} updateState={limitHunts}/>
            </div>
            <div className='SimulatorButton'>
                <Button Purpose={'Simulate'} do={simButton}></Button>
            </div>
        </div>
    );
}

export default ControlPanel;