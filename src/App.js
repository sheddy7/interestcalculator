import React from 'react';
import CalculatorsContainer from './containers/CalculatorsContainer/CalculatorsContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Your loan</h1>
      </header>
      <section className="App-main">
        <CalculatorsContainer />
      </section>
    </div>
  );
}

export default App;
