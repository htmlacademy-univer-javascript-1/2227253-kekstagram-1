import { showBigPicture } from './add-picture.js';
import { getRandom } from './util.js';
const picturesListElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const addPictureTopicturesFragment = (picture) => {
  const { url, likes, comments } = picture;
  const pictureElement = photoTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  });

  picturesFragment.appendChild(pictureElement);
};

const renderPictures = (pictures, option) => {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove() );
  if (option === 'filter-default') {
    pictures.forEach((picture) => {
      addPictureTopicturesFragment(picture);
    });
  } else if (option === 'filter-random') {
    getRandom(pictures, 10).forEach((picture) => {
      addPictureTopicturesFragment(picture);
    });
  } else {
    const picturesSorted =  Array.from(pictures);
    picturesSorted.sort((a, b) =>  b.comments.length - a.comments.length);
    picturesSorted.forEach((picture) => { addPictureTopicturesFragment(picture); });
  }
  picturesListElement.appendChild(picturesFragment);
};

export { renderPictures, picturesFragment };
