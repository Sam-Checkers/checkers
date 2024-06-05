import React, { useState } from 'react';
import CheckersPiece from './CheckersPiece';
import './CheckersBoard.css';

const CheckersBoard = () => {
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handlePieceClick = (row, col) => {
    if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
      setSelectedPiece(null);
    } else {
      setSelectedPiece({ row, col });
    }
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const squareColor = (row + col) % 2 === 0 ? 'light' : 'dark';
        const piece = (row < 3 || row > 4) && (row + col) % 2 !== 0 ? (
          <div
            key={`${row}-${col}`}
            className={`square ${squareColor}`}
            onClick={() => handlePieceClick(row, col)}
          >
            <CheckersPiece
              color={row < 3 ? 'red' : 'black'}
              isKing={false}
              isSelected={selectedPiece && selectedPiece.row === row && selectedPiece.col === col}
            />
          </div>
        ) : (
          <div key={`${row}-${col}`} className={`square ${squareColor}`} />
        );
        board.push(piece);
      }
    }
    return board;
  };

  return <div className="board">{renderBoard()}</div>;
};

export default CheckersBoard;