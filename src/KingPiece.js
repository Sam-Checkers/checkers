import React from 'react';
import './KingPiece.css';

const KingPiece = ({ color, position, handlePieceMove }) => {
  return (
    <div
      className={`king-piece ${color}`}
      onClick={() => handlePieceMove(position)}
    >
      King
    </div>
  );
};

export default KingPiece;