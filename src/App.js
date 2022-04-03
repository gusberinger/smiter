import './App.css';
import Smite from './components/Smite';

function App() {
  return (
    <div className="App">
      <section>
        <div className="container">
          <h1>Smiter</h1>
          <p>A paladin's companion tool.</p>
          {/* <hr></hr> */}
          <Smite></Smite>
        </div>
      </section>
    </div>
  );
}

export default App;
