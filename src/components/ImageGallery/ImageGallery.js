import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onSetImgInfo }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ webformatURL, largeImageURL, tags }, idx) => (
        <ImageGalleryItem
          key={idx}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onSetImgInfo={onSetImgInfo}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onSetImgInfo: PropTypes.func.isRequired,
};

export default ImageGallery;
