import React, { useState } from 'react';
import CheckersPiece from './checkerspiece';
import './checkersboard.css'; // Import the CSS file for styling


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
      // If no piece is selected, set the selected piece
      setSelectedPiece(position);
    } else {
      // Move the piece to the new position
      const updatedPieces = pieces.map((piece) => {
        if (piece.position === selectedPiece) {
          return { ...piece, position: position };
        }
        return piece;
      });
      setPieces(updatedPieces);
      setSelectedPiece(null); // Reset selected piece
    }
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Determine the color of the square based on row and column
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