import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43589665-ada793faa4b6dfc005fe9b149';

const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      page,
    },
  });

  return response.data;
}

export function getPerPage() {
  return PER_PAGE;
}



