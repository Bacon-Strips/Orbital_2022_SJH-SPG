import {useState} from 'react';
import DropInput from './DropInput';
import FillInput from './FillInput';
import Button from './Button';
import {locations, cheeses, powertypes} from './InputOptions'
import ErrorDisplay from './ErrorDisplay';

function ControlPanel(props) {
    
    const [Controlpower, ControlsetPower] = useState(0);
    const [Controlluck, ControlsetLuck] = useState(0);
    const [ControlpowerType, ControlsetPowerType] = useState(' ');
    const [Controlcheese, ControlsetCheese] = useState(' ');
    const [Controllocation, ControlsetLocation] = useState(' ');
    const [ControlnumHunts, ControlsetHunts] = useState(0);
    const [errors, setError] = useState([]);

    function simButton(event) {
        if (Controllocation !== " " && Controlcheese !== " " && ControlpowerType !== " ") {
            props.setPower(Controlpower);
            props.setLuck(Controlluck);
            props.setPowerType(ControlpowerType);
            props.setCheese(Controlcheese);
            props.setLocation(Controllocation);
            props.setHunts(ControlnumHunts);
            props.toggler();
            setError([]);
        } else {
            let errors = [[Controllocation === " ", "Please select a location"]
                            , [Controllocation !== " " && Controlcheese === " ", "Please select a cheese"]
                            , [ControlpowerType === " ", "Please select a Power Type"]];
            setError(errors);
        }
    }

    function limitHunts(num) {
        ControlsetHunts(Math.min(500, num));
    }

    function changeLocation(location) {
        ControlsetLocation(location);
        ControlsetCheese(' ');
      }
    
    return (
        <div className='controls'>
            <div className='custom-values'>
                <DropInput Purpose={'Locations'} value={Controllocation} options={locations} updateState={changeLocation}/>
                <DropInput Purpose={'Cheese'} value={Controlcheese} options={cheeses[Controllocation]} updateState={ControlsetCheese}/>
                <DropInput Purpose={'Power Type'} value={ControlpowerType} options={powertypes} updateState={ControlsetPowerType}/>
                <FillInput Purpose={'Power'} value={Controlpower}updateState={ControlsetPower}/>
                <FillInput Purpose={'Luck'} value={Controlluck} updateState={ControlsetLuck}/>
                <FillInput Purpose={'No. of Hunts'} value={ControlnumHunts} updateState={limitHunts}/>
            </div>
            <div className='SimulatorButton'>
                <Button Purpose={'Simulate'} do={simButton}/>
                <ErrorDisplay conditions={errors}/>
            </div>
        </div>
    );
}

export default ControlPanel;