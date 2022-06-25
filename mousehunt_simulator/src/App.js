import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import EntryTable from './components/EntryTable';
import ControlPanel from './components/ControlPanel';
import Button from './components/Button'

function App() {
  const [SimulateNow, setSimulate] = useState(false);
  const [Buttontext, setText] = useState('Simulate');
  const [power, setPower] = useState(0);
  const [luck, setLuck] = useState(0);
  const [location, setLocation] = useState(' ');
  const [cheese, setCheese] = useState(' ');
  const [powerType, setPowerType] = useState(' ');
  const [numHunts, setHunts] = useState(0);


  function toggle(event) {
    if (SimulateNow === true) {
      setSimulate(false);
      setText('Simulate');
    } else {
      setSimulate(true);
      setText('Reset');
    }
  }

  function changeLocation(location) {
    setLocation(location);
    setCheese(' ');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit the simulator values and click on the simulate button to simulate hunts
        </p>
        <ControlPanel
          power={power}
          setPower={setPower}
          luck={luck}
          setLuck={setLuck}
          numHunts={numHunts}
          setHunts={setHunts}
          location={location}
          setLocation={changeLocation}
          cheese={cheese}
          setCheese={setCheese}
          powerType={powerType}
          setPowerType={setPowerType}
          Buttontext={Buttontext}
          Buttonfunction={toggle}
        />
        
        <EntryTable huntTill={numHunts} cheese={cheese} power={power} luck={luck} powerType={powerType} location={location}/>
        <a className="lol" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Easter Egg!</a>
      </header>
    </div>
  );
}

export default App;
