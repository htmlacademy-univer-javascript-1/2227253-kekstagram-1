import { effects, effectsParams } from './data.js';
import { sendData } from './api.js';

const uploadFile = document.querySelector('#upload-file');
const photoEditor = document.querySelector('.img-upload__overlay');
const closephotoEditorButtom = document.querySelector('#upload-cancel');
const form = document.querySelector('#upload-select-image');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitFormButton = form.querySelector('.img-upload__submit');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsInputs = document.querySelectorAll('.effects__radio');
const effectLevel = document.querySelector('.img-upload__effect-level');
const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');


effectLevel.classList.add('hidden');
let activeFilter = 'none';

noUiSlider.create(
  sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
  }
);

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = parseFloat(sliderElement.noUiSlider.get()).toFixed(1);
  if (activeFilter !== 'none') { imgPreview.style.filter = effectsParams[activeFilter]['filter'](sliderElement.noUiSlider.get()); }
});

effectsInputs.forEach((input) => {
  input.addEventListener('click', () => {

    effects.forEach((effect) => {
      if (imgPreview.classList.contains(effect)) {
        imgPreview.classList.remove(effect);
      }
    });

    activeFilter = input.value;
    input.checked = true;
    if (activeFilter !== 'none') { imgPreview.classList.add(`effects__preview--${activeFilter}`); }
    imgPreview.style.filter = '';
    if (activeFilter === 'none') {
      effectLevel.classList.add('hidden');
      effectLevelValue.value = '0';
    }else {
      effectLevel.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions(effectsParams[activeFilter]['noui']);
    }
    imgPreview.style.filter = '';
  });
});

const closeEditor = () => {
  photoEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');

  activeFilter = 'none';

  effects.forEach((effect) => {
    if (imgPreview.classList.contains(effect)) {
      imgPreview.classList.remove(effect);
    }
  });

  imgPreview.style.filter = '';
  effectsInputs[0].checked = true;
  effectLevel.classList.add('hidden');
  uploadFile.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  effectLevelValue.value = '0';
  scaleControlValue.value = '100%';
  submitFormButton.disabled = false;
};

const createSuccesBlock = () => {
  const successCopy = successTemplate.cloneNode(true).content.querySelector('.success');

  successCopy.addEventListener(
    'click',
    (evt) => {
      if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title') {
        document.body.removeChild(successCopy);
        closeEditor();
      }
    });
  document.body.appendChild(successCopy);
};

const createErrorBlock = (text) => {
  const errorCopy = errorTemplate.cloneNode(true).content.querySelector('.error');
  errorCopy.querySelector('.error__title').textContent = text;

  errorCopy.addEventListener(
    'click',
    (evt) => {
      if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
        document.body.removeChild(errorCopy);
      }
    });
  document.body.appendChild(errorCopy);
};

submitFormButton.addEventListener(
  'click', (evt) => {
    evt.preventDefault();
    sendData(
      createErrorBlock,
      createSuccesBlock,
      new FormData(form));
  });

const validator = new Pristine(
  form,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper'
  }
);

validator.addValidator(
  hashtagInput,
  (value) => {
    const setOfHashtags = new Set();
    const regex = /(^#[A-z0-9А-я]{1,19}$)/i;
    const hashtags  = value.replace(/\s+/g, ' ').trim().split(' ');
    hashtags.forEach((hashtag) => {
      setOfHashtags.add(hashtag.toLowerCase());
    });
    return !value || hashtags.every((hashtag) => regex.test(hashtag) && hashtag.length <= 20) &&
                hashtags.length === setOfHashtags.size && hashtags.length <= 5;
  },
  'Invalid hashtag-(s)'
);

hashtagInput.addEventListener('change', () => { submitFormButton.disabled = !validator.validate();});

uploadFile.addEventListener(
  'change',
  () => {
    photoEditor.classList.remove('hidden');
    document.body.classList.add('modal-open');

    scaleControlValue.value = '100%';
    imgPreview.style.transform = 'scale(1)';
  }
);

closephotoEditorButtom.addEventListener('click', closeEditor);


document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const errorBlock = document.body.querySelector('.error');
    if (errorBlock) {
      document.body.removeChild(errorBlock);
    } else if (
      document.activeElement.tagName !== 'INPUT' &&
      document.activeElement.tagName !== 'TEXTAREA'
    ) {
      closeEditor();
    }
  }
});


scaleControlSmaller.addEventListener(
  'click',
  () => {
    const newValue = Math.max(parseInt(scaleControlValue.value, 10) - 25, 25);
    scaleControlValue.value = `${newValue}%`;
    imgPreview.style.transform = `scale(${newValue / 100})`;
  }
);

scaleControlBigger.addEventListener(
  'click',
  () => {
    const newValue = Math.min(parseInt(scaleControlValue.value, 10) + 25, 100);
    scaleControlValue.value = `${newValue}%`;
    imgPreview.style.transform = `scale(${newValue / 100})`;
  }
);


export { closeEditor };
