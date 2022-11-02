const picturesListElement = document.querySelector('.pictures');

const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const addPictureTopicturesFragment = function(picture, documentFragment) {
  const { url, likes, comments } = picture;
  const pictureElement = photoTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  documentFragment.appendChild(pictureElement);
};

const renderPictures = function(pictures) {
  pictures.forEach((picture) => { addPictureTopicturesFragment(picture, picturesFragment); } );
  picturesListElement.appendChild(picturesFragment);
};

export { renderPictures };
