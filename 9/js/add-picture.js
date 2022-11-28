const fullImageElement = document.querySelector('.big-picture');
const imageElement = fullImageElement.querySelector('.big-picture__img>img');
const likesCountElement = fullImageElement.querySelector('.likes-count');
const descriptionElement = fullImageElement.querySelector('.social__caption');
const commentsElement = fullImageElement.querySelector('.social__comments');
const commentsCountElement = fullImageElement.querySelector('.comments-count');
const closeButton = document.querySelector('#picture-cancel');
const currentCommentsCounter = document.querySelector('span.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');

let numberLastComment = 0;
scaleControlValue.value = '100%';
imgPreview.style.transform = 'scale(1)';

const commentTemplate  = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const closeBigPhoto = () => {
  fullImageElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  numberLastComment = 0;
  commentsElement.innerHTML = '';
};

document.addEventListener('keydown', (evt) => { if (evt.key === 'Escape') { closeBigPhoto(); }});

closeButton.addEventListener('click', () => { closeBigPhoto(); });

const renderComments = (comments) => {
  for (let i = numberLastComment; i < Math.min(comments.length, numberLastComment + 5); i++) {
    const { avatar, name, message } = comments[i];
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    commentsElement.appendChild(commentElement);
  }
  numberLastComment = Math.min(comments.length, numberLastComment + 5);
  currentCommentsCounter.textContent = numberLastComment;
};

const showBigPicture = (picture) => {
  document.body.classList.add('modal-open');
  fullImageElement.classList.remove('hidden');

  const { url, likes, description, comments } = picture;
  imageElement.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  descriptionElement.textContent = description;

  commentsElement.innerHTML = '';
  renderComments(comments);
  commentsLoader.onclick = () => { renderComments(comments); };
};


export { showBigPicture };
