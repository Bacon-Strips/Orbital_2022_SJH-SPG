import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import EntryTable from './components/EntryTable';
import ControlPanel from './components/ControlPanel';

function App() {
  const [power, setPower] = useState(0);
  const [luck, setLuck] = useState(0);
  const [location, setLocation] = useState(' ');
  const [cheese, setCheese] = useState(' ');
  const [powerType, setPowerType] = useState(' ');
  const [numHunts, setHunts] = useState(0);
  const [toggler, setToggler] = useState(0);

  function toggle() {
    setToggler(toggler === 0? toggler + 1 : toggler - 1);
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit the simulator values and click on the simulate button to simulate hunts
        </p>
        <ControlPanel
          setPower={setPower}
          setLuck={setLuck}
          setHunts={setHunts}
          setLocation={setLocation}
          setCheese={setCheese}
          setPowerType={setPowerType}
          toggler={toggle}
        />
        
        <EntryTable huntTill={numHunts} cheese={cheese} power={power} luck={luck} powerType={powerType} location={location} toggler={toggler}/>
        <a className="lol" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Easter Egg!</a>
      </header>
    </div>
  );
}

export default App;
