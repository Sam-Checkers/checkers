import React, { useState } from 'react';
import './KingPiece.css';

const KingPiece = ({ color, isSelected }) => {
  const [isKingSelected, setIsKingSelected] = useState(isSelected);

  const handleClick = () => {
    setIsKingSelected(!isKingSelected);
  };

  return (
    <div
      className={`king-piece ${color} ${isKingSelected ? 'selected' : ''}`}
      onClick={handleClick}
    ></div>
  );
};

export default KingPiece;