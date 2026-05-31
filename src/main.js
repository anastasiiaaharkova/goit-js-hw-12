import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const searchText = event.target.elements['search-text'].value.trim();

  if (!searchText) {
    iziToast.error({
      message: 'Please enter search text!',
      position: 'topRight',
    });

    return;
  }

  clearGallery();

  showLoader();

  getImagesByQuery(searchText)
    .then(data => {
      const images = data.hits;

      if (images.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });

        return;
      }

      createGallery(images);
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong!',
        position: 'topRight',
      });

      console.log(error);
    })
    .finally(() => {
      hideLoader();
    });

  form.reset();
}