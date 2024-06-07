import React, { useState } from 'react';
import PrevImage from '../components/PrevImage';
import './PhotoUploader.css';

function PhotoUploader({ photo, setPhoto, setPhotoFile }) {
  const [error, setError] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const photoURL = URL.createObjectURL(file);
      try {
        await validationForPhoto(photoURL);
        setPhoto(photoURL);
        setPhotoFile(file);
        setError('');
        console.log('Selected file:', file);
      } catch (err) {
        setError(err.message);
        console.log('Validation error:', err);
      }
    }
  };

  const validationForPhoto = async (photoURL) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = photoURL;
      img.onload = () => {
        if (img.width > 200 || img.height > 250) {
          reject(new Error('Image size should be width 200px and height 250px'));
        } else {
          resolve(img);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    });
  };

  return (
    <div className='photoUploader'>
      <PrevImage img={photo} alt='UserPhoto' />
      <label>
        <strong>Upload Your Photo:</strong>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      <p>Photo size should be of width 200px and height 250px.</p>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default PhotoUploader;
