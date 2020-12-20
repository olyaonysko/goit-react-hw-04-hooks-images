import { useState, useEffect } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from './components/Container';
import SearchBar from './components/SearchBar';
import imageApi from './services/image-api';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Loader from './components/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('landscape');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [imgTags, setImgTags] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    imageApi({ searchQuery, page })
      .then(images => {
        if (images.length < 1) {
          toast.info('Nothing matched your search terms 😣');
          setError(true);
          setStatus(Status.REJECTED);
        } else {
          setImages(prevState => [...prevState, ...images]);
          setStatus(Status.RESOLVED);
          if (page !== 1) {
            scrollToBottom();
          }
        }
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmitForm = query => {
    if (searchQuery === query) {
      return;
    }
    setImages([]);
    setPage(1);
    setError(false);
    setSearchQuery(query);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setLargeImageURL('');
  };

  const setImgInfo = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setImgTags(tags);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSubmitForm} />
      {status === Status.REJECTED && error && (
        <p>Whoops, something went wrong 😣</p>
      )}
      {status === Status.PENDING && <Loader />}
      <ImageGallery images={images} onSetImgInfo={setImgInfo} />
      {images.length > 0 && status === Status.RESOLVED && (
        <Button onLoadMore={handleLoadMore} />
      )}

      {largeImageURL && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={imgTags} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
