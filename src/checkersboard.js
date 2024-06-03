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
      const [newRow, newCol] = position.split('-').map(Number);
  
      // Check if there is already a piece at the new position
      const isOccupied = pieces.some((piece) => piece.position === position);
  
      if (!isOccupied) {
        // Additional check for valid move and capturing opponent's piece
        const [selectedRow, selectedCol] = selectedPiece.split('-').map(Number);
        const selectedPieceObj = pieces.find((piece) => piece.position === selectedPiece);
        const opponentPiece = pieces.find((piece) => piece.position === `${(newRow + selectedRow) / 2}-${(newCol + selectedCol) / 2}`);
  
        if (
          (selectedPieceObj.color === 'red' && newRow > selectedRow) ||
          (selectedPieceObj.color === 'black' && newRow < selectedRow)
        ) {
          if (
            Math.abs(selectedRow - newRow) === 2 &&
            Math.abs(selectedCol - newCol) === 2 &&
            opponentPiece &&
            opponentPiece.color !== selectedPieceObj.color
          ) {
            const updatedPieces = pieces.map((piece) => {
              if (piece.position === selectedPiece) {
                return { ...piece, position: position };
              }
              if (piece.position === opponentPiece.position) {
                return { ...piece, position: 'captured' }; // Remove the captured piece from the board
              }
              return piece;
            });
            setPieces(updatedPieces.filter((piece) => piece.position !== 'captured')); // Filter out the captured piece
            setSelectedPiece(null);
          } else if (Math.abs(selectedRow - newRow) === 1 && Math.abs(selectedCol - newCol) === 1) {
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
            console.log('Invalid move: Pieces can only move forward to adjacent squares or capture opponent\'s piece');
          }
        } else {
          // Handle invalid move (e.g., show an error message)
          console.log('Invalid move: Pieces cannot move backward');
        }
      } else {
        // Handle invalid move (e.g., show an error message)
        console.log('Invalid move: The square is already occupied');
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