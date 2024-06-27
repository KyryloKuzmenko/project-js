import { getPhotos } from './unsplash-api';
import { formElem, listElem, loadMoreBtn } from './refs';
import { createGalleryCards } from './render-function';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hiddenLoader, showLoader } from './loader';
import { showBtn, hiddenBtn } from './load-more';

let page = 1;
let searchQuery = null;

formElem.addEventListener('submit', event => {
  event.preventDefault();
  listElem.innerHTML = '';
  showLoader();
  page = 1;

  searchQuery = event.currentTarget.elements['user-search-query'].value.trim();
  getPhotos(searchQuery, page)
    .then(res => {
      if (res.total > 0) {
        iziToast.success({
          position: 'topRight',
          message: `We find ${res.total} photos`
        })
      }
      if (res.results.length === 0) {
        iziToast.error({
          position: 'topRight',
          message: 'Sorry, there are not images',
        });
      }
      listElem.innerHTML = createGalleryCards(res.results);
      if (res.total > 12) {
        showBtn();
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      event.target.reset();
      hiddenLoader();
    });
});

loadMoreBtn.addEventListener('click', () => {
  page++;
  getPhotos(searchQuery, page)
    .then(res => {
    listElem.insertAdjacentHTML('beforeend', createGalleryCards(res.results));
    const lastPage = Math.ceil(res.total / 12);
    if (page === lastPage) {
      hiddenBtn();
      iziToast.info({
        position: 'topRight',
        message: "Sorry, but you've reached the end of results",
      });
    }
  });
});
