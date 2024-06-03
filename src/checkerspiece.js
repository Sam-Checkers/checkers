import React, { useState, useRef } from 'react';

const CheckersPiece = ({ color }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pieceRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - pieceRef.current.offsetWidth / 2;
      const newY = e.clientY - pieceRef.current.offsetHeight / 2;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={pieceRef}
      className={`piece ${color}`}
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* You can customize the appearance of the piece here */}
    </div>
  );
};

export default CheckersPiece;