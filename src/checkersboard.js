import React, { useState } from 'react';
import CheckersPiece from './checkerspiece';
import './checkersboard.css';


const CheckersBoard = () => {
  const [pieces, setPieces] = useState([
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
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handlePieceMove = (position) => {
    if (selectedPiece === null) {
      setSelectedPiece(position);
    } else {
      // Convert the position strings to row and column numbers
      const [selectedRow, selectedCol] = selectedPiece.split('-').map(Number);
      const [newRow, newCol] = position.split('-').map(Number);
  
      // Check if the new position is adjacent to the current position
      if (Math.abs(selectedRow - newRow) === 1 && Math.abs(selectedCol - newCol) === 1) {
        const updatedPieces = pieces.map((piece) => {
          if (piece.position === selectedPiece) {
            return { ...piece, position: position };
          }
          return piece;
        });
        setPieces(updatedPieces);
        setSelectedPiece(null);
      } else {
        // Handle invalid move (e.g., show an error message)
        console.log('Invalid move: Pieces can only move to adjacent squares');
      }
    }
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const squareColor = (row + col) % 2 === 0 ? 'light' : 'dark';
        const position = `${row}-${col}`;
        const piece = pieces.find((p) => p.position === position);
        board.push(
          <div key={position} className={`square ${squareColor}`} onClick={() => handlePieceMove(position)}>
            {piece && (
              <CheckersPiece color={piece.color} position={position} handlePieceMove={handlePieceMove} />
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