import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setHasMore(true);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=40491977-4d771312700760bcb76f7c497&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();

        setImages(prevImages => {
          const uniqueImages = [...prevImages, ...data.hits];

          const uniqueImagesSet = new Set(uniqueImages.map(image => image.id));
          return Array.from(uniqueImagesSet, id =>
            uniqueImages.find(image => image.id === id)
          );
        });

        setHasMore(data.totalHits > images.length);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchImages();
    }
  }, [query, page, hasMore, images.length]);

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {hasMore && images.length > 0 && <Button onClick={loadMoreImages} />}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          imageUrl={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
