import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="gallery">
      {images.map((image, index) => (
        <ImageGalleryItem
          key={`${image.id}-${index}`}
          image={image}
          onClick={onImageClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
