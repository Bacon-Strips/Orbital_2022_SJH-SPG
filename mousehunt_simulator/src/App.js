import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import EntryTable from './components/EntryTable';
import ControlPanel from './components/ControlPanel';
import Button from './components/Button'

function App() {
  const [SimulateNow, setSimulate] = useState(false);
  const [Buttontext, setText] = useState('Simulate');
  
  function toggle(event) {
    if (SimulateNow === true) {
      setSimulate(false);
      setText('Simulate');
    } else {
      setSimulate(true);
      setText('Reset');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit the simulator values and click on the simulate button to simulate hunts
        </p>
        <ControlPanel></ControlPanel>
        <Button Purpose={Buttontext} do={toggle}></Button>
        <EntryTable display={SimulateNow} huntTill={30} cheese={'brie'} power={3000} luck={30} powerType={'shadow'} location={'Meadow'}/>
      </header>
    </div>
  );
}

export default App;
