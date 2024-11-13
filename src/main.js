import createMarkup from './js/render-functions';
import fetchImages from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  const query = event.currentTarget.elements.query.value.trim();

  if (query.length === 0) {
    return;
  }

  showLoader();

  fetchImages(query)
    .then(images => {
      if (images.length > 0) {
        galleryContainer.insertAdjacentHTML('beforeend', createMarkup(images));
        lightbox.refresh();
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message:
          'Something went wrong while fetching images. Please try again later!',
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}
