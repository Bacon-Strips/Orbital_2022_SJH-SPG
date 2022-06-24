import logo from './logo.svg';
import './App.css';
import EntryTable from './components/EntryTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit the simulator values and click on the simulate button to simulate hunts
        </p>
        <EntryTable huntTill={30} cheese={'brie'} power={3000} luck={30} powerType={'shadow'} location={'Meadow'}/>
      </header>
    </div>
  );
}

export default App;
