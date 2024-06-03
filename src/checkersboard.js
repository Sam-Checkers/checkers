import React from 'react';
import CheckersPiece from './checkerspiece';
import './checkersboard.css'; // Import the CSS file for styling

const CheckersBoard = () => {
  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Determine the color of the square based on row and column
        const squareColor = (row + col) % 2 === 0 ? 'light' : 'dark';
        board.push(
          <div key={`${row}-${col}`} className={`square ${squareColor}`}>
            {/* Logic to render pieces */}
            {row < 3 && (row + col) % 2 !== 0 && <CheckersPiece color="red" />}
            {row > 4 && (row + col) % 2 !== 0 && <CheckersPiece color="black" />}
          </div>
        );
      }
    }
    return board;
  };

  return <div className="board">{renderBoard()}</div>;
};

export default CheckersBoard;