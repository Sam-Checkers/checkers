import React, { useState, useRef } from 'react';
import './CheckersPiece.css';

const CheckersPiece = ({ color, position }) => {
  const [selected, setSelected] = useState(false);
  const pieceRef = useRef(null);

  const handleClick = () => {
    setSelected(!selected);
    if (!selected) {
      console.log('Selected position:', position);
    }
  };

  return (
    <div
      ref={pieceRef}
      className={`piece ${color} ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
    </div>
  );
};

export default CheckersPiece;