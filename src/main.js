import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, getPerPage } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();

  const searchText = event.target.elements['search-text'].value.trim();

  if (!searchText) {
    iziToast.error({
      message: 'Please enter search text!',
      position: 'topRight',
    });

    return;
  }

  currentQuery = searchText;
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;
    totalHits = data.totalHits;

    if (images.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    createGallery(images);
    updateLoadMoreState();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong!',
      position: 'topRight',
    });

    console.error(error);
  } finally {
    hideLoader();
  }

  form.reset();
}

async function handleLoadMore() {
  if (!currentQuery) {
    return;
  }

  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;

    if (images.length === 0) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });

      return;
    }

    createGallery(images);
    smoothScrollAfterLoad();
    updateLoadMoreState();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong!',
      position: 'topRight',
    });

    console.error(error);
  } finally {
    hideLoader();
  }
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}

function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

function updateLoadMoreState() {
  const perPage = getPerPage();
  const isEndOfCollection = currentPage * perPage >= totalHits;

  if (totalHits > 0 && !isEndOfCollection) {
    showLoadMoreButton();
    return;
  }

  hideLoadMoreButton();

  if (totalHits > 0 && isEndOfCollection) {
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
}

function smoothScrollAfterLoad() {
  const card = document.querySelector('.gallery .gallery-item');

  if (!card) {
    return;
  }

  const { height } = card.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

