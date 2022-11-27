const uploadFile = document.querySelector('#upload-file');
const photoEditor = document.querySelector('.img-upload__overlay');
const closephotoEditorButtom = document.querySelector('#upload-cancel');
const form = document.querySelector('#upload-select-image');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitFormButton = form.querySelector('.img-upload__submit');

const validator = new Pristine(
  form,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper'
  }
);

const closeEditor = () => {
  photoEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadFile.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  submitFormButton.disabled = false;
  validator.validate();
};

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
  }
);

closephotoEditorButtom.addEventListener( 'click', closeEditor);

document.addEventListener('keydown', (evt) => {
  if (
    evt.key === 'Escape' &&
    document.activeElement.tagName !== 'INPUT' &&
    document.activeElement.tagName !== 'TEXTAREA'
  ) { closeEditor(); }
});

export { closeEditor };
