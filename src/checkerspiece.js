import React, { useState } from 'react';
import './CheckersPiece.css';

const CheckersPiece = ({ color, isKing }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const pieceClass = `piece ${color} ${isKing ? 'king' : ''} ${isSelected ? 'selected' : ''}`;

  return <div className={pieceClass} onClick={handleClick}></div>;
};

export default CheckersPiece;