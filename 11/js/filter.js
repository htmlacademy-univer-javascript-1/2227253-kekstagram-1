import { renderPictures } from './pictures.js';
import { debounce } from './util.js';

const filterButtons = document.querySelectorAll('.img-filters__button');
const debounceForRenderPictures = debounce(renderPictures, 500);

const createEventListenersFilter = (pictures) => {
  filterButtons.forEach((filterButton) => {

    filterButton.addEventListener(
      'click',
      () => {
        filterButtons.forEach((_filterButton) => _filterButton.classList.remove('img-filters__button--active'));
        filterButton.classList.add('img-filters__button--active');
        debounceForRenderPictures(pictures, filterButton.id);
      }
    );
  });
};

export {createEventListenersFilter};
