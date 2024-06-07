import React from 'react';
import './PrevImage.css'
function PrevImage({ img, alt = 'Any Image', width = 200, height = 250, mystyle, className }) {
  const newStyle = {
    ...mystyle,
    objectFit: 'cover' // Ensure the image covers the given dimensions
  };

  return (
    <div className='prevImage'>
      {img && (
        <img
          src={img} 
          alt={alt}
          width={width}
          height={height}
          style={newStyle}
          className={className}
        />
      )}
    </div>
  );
}

export default PrevImage;

