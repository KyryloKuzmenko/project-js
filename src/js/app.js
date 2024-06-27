import { getPhotos } from './unsplash-api';
import { formElem, listElem, loadMoreBtn } from './refs';
import { createGalleryCards } from './render-function';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hiddenLoader, showLoader } from './loader';
import { showBtn, hiddenBtn } from './load-more';

let page = 1;
let searchQuery = null;

formElem.addEventListener('submit', async event => {
  event.preventDefault();
  listElem.innerHTML = '';
  showLoader();
  hiddenBtn();
  page = 1;
  searchQuery = event.currentTarget.elements['user-search-query'].value.trim();
  try {
    const res = await getPhotos(searchQuery, page);
    if (res.data.total > 0) {
      iziToast.success({
        position: 'topRight',
        message: `We find ${res.data.total} photos`,
      });
    }
    if (res.data.results.length === 0) {
      iziToast.error({
        position: 'topRight',
        message: 'Sorry, there are not images',
      });
    }
    listElem.innerHTML = createGalleryCards(res.data.results);
    if (res.data.total > 12) {
      showBtn();
    }
  } catch (err) {
    console.log(err);
  } finally {
    event.target.reset();
    hiddenLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  showLoader();
  try {
    const res = await getPhotos(searchQuery, page);
    listElem.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(res.data.results)
    );
    // function scroll
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    //
    const lastPage = Math.ceil(res.data.total / 12);
    if (page === lastPage) {
      hiddenBtn();
      iziToast.info({
        position: 'topRight',
        message: "Sorry, but you've reached the end of results",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    hiddenLoader();
  }
});
