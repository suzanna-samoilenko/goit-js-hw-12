import createMarkup from './js/render-functions';
import { fetchImages, PER_PAGE } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const form = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');

axios.defaults.timeout = 5000; // Встановлення тайм-ауту для запитів

form.addEventListener('submit', onSubmitForm);
loadMore.addEventListener('click', onLoadMore);

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let totalHits = 0;
let query = '';

async function onSubmitForm(event) {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  page = 1;
  query = event.currentTarget.elements.query.value.trim();

  if (!query) {
    iziToast.info({
      position: 'topRight',
      title: 'Info',
      message: 'Please enter a search term.',
    });
    return;
  }

  showLoader(loader);
  loadMore.classList.add('load-more-hidden');

  try {
    const { hits, totalHits: newTotalHits } = await fetchImages(query, page);
    totalHits = newTotalHits;

    if (hits.length > 0) {
      galleryContainer.innerHTML = createMarkup(hits);
      lightbox.refresh();

      if (hits.length === PER_PAGE) {
        loadMore.classList.remove('load-more-hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Error fetching images. Please try again!',
    });
  } finally {
    hideLoader(loader);
    form.reset();
  }
}

async function onLoadMore() {
  page += 1;
  showLoader(loader);

  try {
    const { hits } = await fetchImages(query, page);

    if (hits.length > 0) {
      galleryContainer.insertAdjacentHTML('beforeend', createMarkup(hits));
      lightbox.refresh();

      if (hits.length < PER_PAGE || page * PER_PAGE >= totalHits) {
        iziToast.info({
          position: 'topRight',
          title: 'End of Results',
          message: "We're sorry, but you've reached the end of search results.",
        });
        loadMore.classList.add('load-more-hidden');
      }
    }
  } catch (error) {
    console.error('Error loading more images:', error);
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Unable to load more images. Please try again later.',
    });
  } finally {
    hideLoader(loader);
    scrollPage();
  }
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function scrollPage() {
  const firstChild = galleryContainer.firstElementChild;
  if (!firstChild) return;

  const { height: cardHeight } = firstChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
