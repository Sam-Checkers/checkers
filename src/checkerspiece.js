import React from 'react';
import './CheckersPiece.css';

const CheckersPiece = ({ color, isKing, isSelected }) => {
  const pieceClassName = `piece ${color} ${isKing ? 'king' : ''} ${isSelected ? 'selected' : ''}`;

  return <div className={pieceClassName} />;
};

export default CheckersPiece;