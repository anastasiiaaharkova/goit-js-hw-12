import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43589665-ada793faa4b6dfc005fe9b149';

export function getImagesByQuery(query) {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  })
    .then(response => response.data)
}