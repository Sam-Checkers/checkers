import React from 'react';
import CheckersBoard from './checkersboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CheckersBoard /> {/* Render the RockPaperScissors component */}
      </header>
    </div>
  );
}

export default App;