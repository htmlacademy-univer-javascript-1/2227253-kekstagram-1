import { renderPictures } from './pictures.js';
import { closeEditor } from './form.js';
import { getData } from './api.js';

closeEditor();
getData(renderPictures);
