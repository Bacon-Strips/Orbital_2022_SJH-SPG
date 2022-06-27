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
        <div className='controlpanel'>
            <table id='controls'>
                <tbody>
                    <tr id="locations">
                        <td id="controllabel">
                            <p>{'Locations :'}</p>
                        </td>
                        <td>
                            <DropInput value={Controllocation} options={locations} updateState={changeLocation}/>
                        </td>
                    </tr>
                    <tr id="cheese">
                        <td id="controllabel">
                            <p>{'Cheese :'}</p>
                        </td>
                        <td>
                            <DropInput value={Controlcheese} options={cheeses[Controllocation]} updateState={ControlsetCheese}/>
                        </td>
                    </tr>
                    <tr id="power_type">
                        <td id="controllabel">
                            <p>{"Power Type :"}</p>
                        </td>
                        <td>
                            <DropInput value={ControlpowerType} options={powertypes} updateState={ControlsetPowerType}/>                    
                        </td>
                    </tr>
                    <tr id="power">
                        <td id="controllabel">
                            <p>{"Power :"}</p>
                        </td>
                        <td>
                            <FillInput value={Controlpower}updateState={ControlsetPower}/>                        
                        </td>
                    </tr>
                    <tr id="luck">
                        <td id="controllabel">
                            <p>{"Luck :"}</p>
                        </td>
                        <td>
                            <FillInput value={Controlluck} updateState={ControlsetLuck}/>                        
                        </td>
                    </tr>
                    <tr id="numHunts">
                        <td id="controllabel">
                            <p>{"No. of Hunts :"}</p>
                        </td>
                        <td>
                            <FillInput Purpose={'No. of Hunts'} value={ControlnumHunts} updateState={limitHunts}/>                    
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="sim_btn">
                <Button Purpose={'Simulate'} do={simButton}/>
                <ErrorDisplay conditions={errors}/>
            </div>
        </div>
    );
}

export default ControlPanel;