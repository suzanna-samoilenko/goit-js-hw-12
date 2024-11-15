import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '46866610-7fa4fac7b73adfddfb088af07';
export const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: PER_PAGE,
  });

  try {
    const response = await axios.get(BASE_URL, { params });
    const { hits, totalHits } = response.data;

    if (hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message:
          'Sorry, no images matching your search query. Please try again!',
      });
    }
    return { hits, totalHits };
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Error fetching images. Please try again!',
    });
    throw error;
  }
}
