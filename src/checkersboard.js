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
  
      const isForwardDiagonalMove = isKing ? Math.abs(row - selectedRow) === 1 : (row - selectedRow === (selectedColor === 'red' ? 1 : -1)) && Math.abs(col - selectedCol) === 1;
  
      if (isForwardDiagonalMove) {
        const newBoardState = [...boardState];
        newBoardState[row][col] = selectedColor;
        newBoardState[selectedRow][selectedCol] = null;
        setBoardState(newBoardState);
  
        if (!isKing) {
          if ((selectedColor === 'red' && row === 7) || (selectedColor === 'black' && row === 0)) {
            const updatedSelectedPiece = { row: selectedRow, col: selectedCol, color: selectedColor, isKing: true };
            setSelectedPiece(updatedSelectedPiece);
            console.log(`Piece at (${selectedRow}, ${selectedCol}) has become a king!`);
          }
        }
  
        setSelectedPiece(null);
      } else {
        const opposingPieceRow = (row + selectedRow) / 2;
        const opposingPieceCol = (col + selectedCol) / 2;
  
        if (
          boardState[opposingPieceRow] &&
          boardState[opposingPieceRow][opposingPieceCol] &&
          boardState[opposingPieceRow][opposingPieceCol] !== selectedColor
        ) {
          const newBoardState = [...boardState];
          newBoardState[row][col] = selectedColor;
          newBoardState[selectedRow][selectedCol] = null;
          newBoardState[opposingPieceRow][opposingPieceCol] = null;
          setBoardState(newBoardState);
          setSelectedPiece(null);
        } else {
          console.log('Invalid move: Non-king pieces can only move forward diagonally.');
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
        let isKing = false;
        if (pieceColor === 'red' && row === 7) {
          isKing = true;
        } else if (pieceColor === 'black' && row === 0) {
          isKing = true;
        }
        if (pieceColor) {
          board.push(
            <div key={position} className={`square ${squareColor}`} onClick={() => handlePieceClick(row, col)}>
              <CheckersPiece color={pieceColor} isKing={isKing} />  {/* Pass the isKing prop to CheckersPiece */}
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