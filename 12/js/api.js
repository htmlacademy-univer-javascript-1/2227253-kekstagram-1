import { errorPhotos } from './data.js';
import { createEventListenersFilter  } from './filter.js';
import { submitFormButton } from './form.js';

const filterPhoto = document.querySelector('.img-filters');

const getData = (render) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      render(photos, 'filter-default');
      createEventListenersFilter(photos);
    })
    .then(() => {
      filterPhoto.classList.remove('img-filters--inactive');
    })
    .catch(() => render(errorPhotos, 'filter-default'));
};

const sendData = (onFail, onSuccess, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      submitFormButton.disabled = false;
      if (!response.ok) {
        if (response.status === 400) {
          onFail('Неверный формат файла!');
        } else {
          onFail('Данные не отправлены!');
        }
      } else {
        onSuccess();
      }
    })
    .catch(() => {
      submitFormButton.disabled = false;
      onFail('Данные не отправлены!');
    });
};

export { getData, sendData };
