import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'https://pixabay.com/api';

const apiKey = '18638925-2c8019a9c3774592e4e395576';

const fetchImages = ({ searchQuery = '', page = 1 }) => {
  return axios
    .get(
      `/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(({ data }) => data.hits);
};

fetchImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default fetchImages;
