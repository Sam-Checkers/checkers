import React, { useState, useEffect } from 'react';
import './CheckersPiece.css';

const CheckersPiece = ({ color, isKing }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [king, setKing] = useState(isKing);

  useEffect(() => {
    setKing(isKing);
  }, [isKing]);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return <div className={`piece ${color} ${king ? 'king' : ''} ${isSelected ? 'selected' : ''}`} onClick={handleClick}></div>;
};

export default CheckersPiece;