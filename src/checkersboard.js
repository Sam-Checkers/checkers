import React, { useState } from 'react';
import './CheckersBoard.css';
import CheckersPiece from './CheckersPiece';

const CheckersBoard = () => {
  const initialBoardState = [
    [null, 'red', null, 'red', null, 'red', null, 'red'],
    ['red', null, 'red', null, 'red', null, 'red', null],
    [null, 'red', null, 'red', null, 'red', null, 'red'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['black', null, 'black', null, 'black', null, 'black', null],
    [null, 'black', null, 'black', null, 'black', null, 'black'],
    ['black', null, 'black', null, 'black', null, 'black', null],
  ];

  const [boardState, setBoardState] = useState(initialBoardState);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handlePieceClick = (row, col) => {
    const pieceColor = boardState[row][col];
    if (pieceColor) {
      setSelectedPiece({ row, col, color: pieceColor });
    }
  };

  const handleSquareClick = (row, col) => {
    if (selectedPiece) {
      const { row: selectedRow, col: selectedCol, color: selectedColor } = selectedPiece;
  
      // Determine the direction of movement based on the color of the piece
      const forwardDirection = selectedColor === 'red' ? 1 : -1;
  
      // Check if the clicked square is a valid forward diagonal move
      const isValidForwardDiagonalMove = row - selectedRow === forwardDirection && Math.abs(col - selectedCol) === 1;
  
      if (isValidForwardDiagonalMove) {
        // Update the board state to move the piece to the clicked square
        const newBoardState = [...boardState];
        newBoardState[row][col] = selectedColor;
        newBoardState[selectedRow][selectedCol] = null;
        setBoardState(newBoardState);
        setSelectedPiece(null);
      } else {
        // Check if a jump over an opposing piece is possible
        const opposingPieceRow = (row + selectedRow) / 2;
        const opposingPieceCol = (col + selectedCol) / 2;
  
        if (
          boardState[opposingPieceRow] &&
          boardState[opposingPieceRow][opposingPieceCol] &&
          boardState[opposingPieceRow][opposingPieceCol] !== selectedColor
        ) {
          // Perform the jump by updating the board state
          const newBoardState = [...boardState];
          newBoardState[row][col] = selectedColor;
          newBoardState[selectedRow][selectedCol] = null;
          newBoardState[opposingPieceRow][opposingPieceCol] = null;
          setBoardState(newBoardState);
          setSelectedPiece(null);
        } else {
          // Handle invalid move (e.g., show an error message)
          console.log('Invalid move: Pieces can only move forward diagonally or jump over an opposing piece.');
        }
      }
    }
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const squareColor = (row + col) % 2 === 0 ? 'light' : 'dark';
        const position = `${row}-${col}`;
        const pieceColor = boardState[row][col];
        if (pieceColor) {
          board.push(
            <div key={position} className={`square ${squareColor}`} onClick={() => handlePieceClick(row, col)}>
              <CheckersPiece color={pieceColor} isKing={false} />
            </div>
          );
        } else {
          board.push(
            <div key={position} className={`square ${squareColor}`} onClick={() => handleSquareClick(row, col)}>
            </div>
          );
        }
      }
    }
    return board;
  };

  return <div className="board">{renderBoard()}</div>;
};

export default CheckersBoard;