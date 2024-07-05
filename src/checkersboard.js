import React, { useState } from 'react';
import './CheckersBoard.css';
import CheckersPiece from './CheckersPiece';
import KingPiece from './KingPiece';

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
      const newBoardState = boardState.map(row => [...row]);
  
      let forwardDirection;
      if (isKing) {
        forwardDirection = 1;
      } else {
        forwardDirection = selectedColor === 'red' ? 1 : -1;
      }
  
      const rowDiff = row - selectedRow;
      const colDiff = Math.abs(col - selectedCol);
  
      const isValidForwardDiagonalMove = rowDiff === forwardDirection && colDiff === 1;
  
      if (isValidForwardDiagonalMove) {
        if (!newBoardState[row][col]) {
          newBoardState[row][col] = newBoardState[selectedRow][selectedCol];
          newBoardState[selectedRow][selectedCol] = null;
  
          if (!isKing && ((selectedColor === 'red' && row === 7) || (selectedColor === 'black' && row === 0))) {
            newBoardState[row][col] = selectedColor === 'red' ? 'red-king' : 'black-king';
            newBoardState[selectedRow][selectedCol] = null;
            setBoardState(newBoardState);
            setSelectedPiece(null);
            console.log(`Piece at (${selectedRow}, ${selectedCol}) has been replaced with a king piece!`);
          } else {
            setBoardState(newBoardState);
            setSelectedPiece(null);
          }
        } else {
          console.log('Invalid move: Non-king pieces can only move forward diagonally.');
        }
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
          console.log('Invalid move: Pieces can only move diagonally or jump over an opposing piece.');
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
        const isSelected = selectedPiece && selectedPiece.row === row && selectedPiece.col === col;
  
        if (pieceColor) {
          const isKing = pieceColor === 'red-king' || pieceColor === 'black-king';
          if (isKing) {
            board.push(
              <div key={position} className={`square ${squareColor}`} onClick={() => handlePieceClick(row, col)}>
                <KingPiece color={pieceColor} isSelected={isSelected} /> {}
              </div>
            );
          } else {
            board.push(
              <div key={position} className={`square ${squareColor}`} onClick={() => handlePieceClick(row, col)}>
                <CheckersPiece color={pieceColor} isKing={false} />
              </div>
            );
          }
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