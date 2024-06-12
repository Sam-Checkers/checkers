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
      const { row: selectedRow, col: selectedCol, color: selectedColor, isKing } = selectedPiece;
      const newBoardState = [...boardState];
  
      let forwardDirection;
      if (isKing) {
        forwardDirection = 1; // Kings can move in both directions
      } else {
        forwardDirection = selectedColor === 'red' ? 1 : -1; // Red pieces move downward, black pieces move upward
      }
  
      const rowDiff = row - selectedRow;
      const colDiff = Math.abs(col - selectedCol);
  
      // Check if the move is a valid forward diagonal move
      const isValidForwardDiagonalMove = rowDiff === forwardDirection && colDiff === 1;
  
      if (isValidForwardDiagonalMove) {
        // Check if the target position is empty
        if (!newBoardState[row][col]) {
          newBoardState[row][col] = selectedColor;
          newBoardState[selectedRow][selectedCol] = null;
  
          // Check if the piece becomes a king after reaching the end of the board
          if (!isKing && ((selectedColor === 'red' && row === 7) || (selectedColor === 'black' && row === 0))) {
            newBoardState[row][col] = { color: selectedColor, isKing: true };
            console.log(`Piece at (${selectedRow}, ${selectedCol}) has become a king!`);
          }
  
          setBoardState(newBoardState);
          setSelectedPiece(null);
        } else {
          // Check if the target position contains an opponent's piece
          const opposingPieceRow = (row + selectedRow) / 2;
          const opposingPieceCol = (col + selectedCol) / 2;
  
          if (
            newBoardState[opposingPieceRow] &&
            newBoardState[opposingPieceRow][opposingPieceCol] &&
            newBoardState[opposingPieceRow][opposingPieceCol] !== selectedColor
          ) {
            // Capture the opponent's piece
            newBoardState[row][col] = selectedColor;
            newBoardState[selectedRow][selectedCol] = null;
            newBoardState[opposingPieceRow][opposingPieceCol] = null;
  
            // Check if the piece becomes a king after capturing the opponent
            if (!isKing && ((selectedColor === 'red' && row === 7) || (selectedColor === 'black' && row === 0))) {
              newBoardState[row][col] = { color: selectedColor, isKing: true };
              console.log(`Piece at (${selectedRow}, ${selectedCol}) has become a king after capturing an opponent!`);
            }
  
            setBoardState(newBoardState);
            setSelectedPiece(null);
          } else {
            console.log('Invalid move: Pieces can only move forward diagonally or jump over an opposing piece.');
          }
        }
      } else {
        console.log('Invalid move: Pieces can only move forward diagonally or jump over an opposing piece.');
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