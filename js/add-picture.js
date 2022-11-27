const fullImageElement = document.querySelector('.big-picture');
const imageElement = fullImageElement.querySelector('.big-picture__img>img');
const likesCountElement = fullImageElement.querySelector('.likes-count');
const descriptionElement = fullImageElement.querySelector('.social__caption');
const commentsElement = fullImageElement.querySelector('.social__comments');
const commentsCountElement = fullImageElement.querySelector('.comments-count');
const closeButton = document.querySelector('#picture-cancel');

const commentTemplate  = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const closeBigPhoto = () => {
  fullImageElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

document.addEventListener('keydown', (evt) => { if (evt.key === 'Escape') { closeBigPhoto(); }});

closeButton.addEventListener('click', () => { closeBigPhoto(); });

const renderComments = (comments) => {
  commentsElement.innerHTML = '';

  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    commentsElement.appendChild(commentElement);
  });
};

const showBigPicture = (picture) => {
  document.body.classList.add('modal-open');
  fullImageElement.classList.remove('hidden');

  const { url, likes, description, comments } = picture;
  imageElement.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  descriptionElement.textContent = description;

  renderComments(comments);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

export { showBigPicture };
