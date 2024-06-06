import React, { useState } from 'react';
import CheckersPiece from './CheckersPiece';
import './CheckersBoard.css';

const CheckersBoard = () => {
  const [pieces] = useState([
    { color: 'red', position: '0-1' },
    { color: 'red', position: '0-3' },
    { color: 'red', position: '0-5' },
    { color: 'red', position: '0-7' },
    { color: 'red', position: '1-0' },
    { color: 'red', position: '1-2' },
    { color: 'red', position: '1-4' },
    { color: 'red', position: '1-6' },
    { color: 'red', position: '2-1' },
    { color: 'red', position: '2-3' },
    { color: 'red', position: '2-5' },
    { color: 'red', position: '2-7' },
    { color: 'black', position: '5-0' },
    { color: 'black', position: '5-2' },
    { color: 'black', position: '5-4' },
    { color: 'black', position: '5-6' },
    { color: 'black', position: '6-1' },
    { color: 'black', position: '6-3' },
    { color: 'black', position: '6-5' },
    { color: 'black', position: '6-7' },
    { color: 'black', position: '7-0' },
    { color: 'black', position: '7-2' },
    { color: 'black', position: '7-4' },
    { color: 'black', position: '7-6' },

  ]);

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const squareColor = (row + col) % 2 === 0 ? 'light' : 'dark';
        const position = `${row}-${col}`;
        const piece = pieces.find((p) => p.position === position);
        board.push(
          <div key={position} className={`square ${squareColor}`}>
            {piece && (
              <CheckersPiece color={piece.color} position={position}/>
            )}
          </div>
        );
      }
    }
    return board;
  };

  return <div className="board">{renderBoard()}</div>;
};

export default CheckersBoard;