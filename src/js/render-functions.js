import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getPerPage } from './pixabay-api';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a');


export function createGallery(images) {
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img
            class="gallery-image"
            src="${image.webformatURL}"
            alt="${image.tags}"
          />
        </a>

        <div class="info">
          <p><b>Likes</b> ${image.likes}</p>
          <p><b>Views</b> ${image.views}</p>
          <p><b>Comments</b> ${image.comments}</p>
          <p><b>Downloads</b> ${image.downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').classList.remove('hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('hidden');
}

export function showLoadMore() {
  loadMoreBtn?.classList.remove('hidden');
}

export function hideLoadMore() {
  loadMoreBtn?.classList.add('hidden');
}

export const showLoadMoreButton = showLoadMore;
export const hideLoadMoreButton = hideLoadMore;

export function updateLoadMoreState(currentPage, totalHits) {
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


