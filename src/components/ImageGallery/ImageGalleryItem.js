import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags = '',
  onSetImgInfo,
}) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        onClick={() => {
          onSetImgInfo({ largeImageURL, tags });
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onSetImgInfo: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
