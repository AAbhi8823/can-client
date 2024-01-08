import React, { useState, useRef } from 'react';
import RegisterImage from '../Pages/RegisterImage';
import { upload } from '@testing-library/user-event/dist/upload';

const ImageUploader = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        hidden
      />
      <button onClick={handleClick}>

        {props.title}

      </button>
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
