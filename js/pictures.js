import { showBigPicture } from './add-picture.js';

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

const renderPictures = (pictures) => {
  pictures.forEach((picture) => {
    addPictureTopicturesFragment(picture, picturesFragment);
  } );
  picturesListElement.appendChild(picturesFragment);
};

export { renderPictures };
