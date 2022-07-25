import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { doc, getDocs, collection, getDoc } from "firebase/firestore";

import DropInput from './DropInput';
import FillInput from './FillInput';
import Button from './Button';
import {locations, cheeses, powertypes, trapOpt, baseOpt, charmOpt} from './InputOptions'
import ErrorDisplay from './ErrorDisplay';
import { db } from '../firebase-config';

const trapData = {};
const baseData = {};
const charmData = {};

const initialize = async () => {
    let charms = await getDocs(collection(db, 'Charm'));
    let traps = await getDocs(collection(db, 'Trap'));
    let bases = await getDocs(collection(db, 'Base'));
    charms.forEach((doc) => {
        charmData[doc.id] = doc.data();
    })
    traps.forEach((doc) => {
        trapData[doc.id] = doc.data();
    })
    bases.forEach((doc) => {
        baseData[doc.id] = doc.data();
    })
}

initialize();

function ControlPanel(props) {
    
    const [Controlpower, ControlsetPower] = useState(0);
    const [Controlluck, ControlsetLuck] = useState(0);
    const [ControlpowerType, ControlsetPowerType] = useState(' ');
    const [Controlcheese, ControlsetCheese] = useState(' ');
    const [Controllocation, ControlsetLocation] = useState(' ');
    const [ControlnumHunts, ControlsetHunts] = useState(0);
    const [trap, setTrap] = useState(' ');
    const [base, setBase] = useState(' ');
    const [charm, setCharm] = useState(' ');
    const [pBonus, setPBonus] = useState(0);
    const [bLuck, setBLuck] = useState(0);
    const [goldenShield, setGoldenShield] = useState(false);
    const [errors, setError] = useState([]);

    const [custom, setCustom] = useState(true);

    function simButton(event) {
        let validSetup = custom || (trap !== ' ' && base !== ' ');
        if (Controllocation !== " " && Controlcheese !== " " && (ControlpowerType !== " " || !custom) && validSetup) {
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
                            , [ControlpowerType === " " && custom, "Please select a Power Type"]
                            , [!custom && trap === ' ', "Please select a trap"]
                            , [!custom && base === ' ', "Please select a base"]];
            setError(errors);
        }
    }

    const reset = () => {
        ControlsetLuck(0);
        ControlsetPower(0);
        ControlsetPowerType(' ');
        setTrap(' ');
        setBase(' ');
        setCharm(' ');
        setPBonus(0);
        setBLuck(0);
        setGoldenShield(false);
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
                    <tr id="numHunts">
                        <td id="controllabel">
                            <p>{"No. of Hunts :"}</p>
                        </td>
                        <td>
                            <FillInput Purpose={'No. of Hunts'} value={ControlnumHunts} updateState={limitHunts}/>                    
                        </td>
                    </tr>
                    <tr id="toggleCustom">
                        <td id="controllabel">
                            <p>{"Custom value :"}</p>
                        </td>
                        <td>
                            <Form>
                                <Form.Check 
                                    type='checkbox'
                                    id='toggle'
                                    defaultChecked={custom}
                                    onClick={(event) => {
                                        setCustom(event.target.checked);
                                        reset();
                                    }}
                                />    
                            </Form>              
                        </td>
                    </tr>
                </tbody>
                { custom ?
                <tbody>
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
                </tbody> 
                :
                <tbody>
                    <></>
                    <tr id="trap">
                        <td id="controllabel">
                            <p>{"Trap :"}</p>
                        </td>
                        <td>
                            <DropInput value={trap} options={trapOpt} updateState={setTrap}/>                    
                        </td>
                    </tr>
                    <tr id="base">
                        <td id="controllabel">
                            <p>{"Base :"}</p>
                        </td>
                        <td>
                            <DropInput value={base} options={baseOpt} updateState={setBase}/>                        
                        </td>
                    </tr>
                    <tr id="charm">
                        <td id="controllabel">
                            <p>{"Charm :"}</p>
                        </td>
                        <td>
                            <DropInput value={charm} options={charmOpt} updateState={setCharm}/>                        
                        </td>
                    </tr>
                    <tr id="bPower">
                        <td id="controllabel">
                            <p>{"Bonus Power % :"}</p>
                        </td>
                        <td>
                            <FillInput value={pBonus} updateState={setPBonus}/> 
                        </td>
                    </tr>
                    <tr id="extraLuck">
                        <td id="controllabel">
                            <p>{"Bonus Luck :"}</p>
                        </td>
                        <td>
                            <FillInput value={bLuck} updateState={setBLuck}/> 
                        </td>
                    </tr>
                    <tr id="goldenShield">
                        <td id="controllabel">
                            <p>{"Golden Shield :"}</p>
                        </td>
                        <td>
                            <Form>
                                <Form.Check 
                                    type='checkbox'
                                    id='toggleShield'
                                    defaultChecked={goldenShield}
                                    onClick={(event) => {
                                        setGoldenShield(event.target.checked);
                                    }}
                                />    
                            </Form> 
                        </td>
                    </tr>
                </tbody> 
                }
            </table>
            <div id="sim_btn">
                <Button Purpose={'Simulate'} do={simButton}/>
                <ErrorDisplay conditions={errors}/>
            </div>
        </div>
    );
}

export default ControlPanel;