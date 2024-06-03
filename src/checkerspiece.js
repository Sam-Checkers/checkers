import React from 'react';

const CheckersPiece = ({ color }) => {
  return (
    <div className={`piece ${color}`}>
      {/* You can customize the appearance of the piece here */}
    </div>
  );
};

export default CheckersPiece;