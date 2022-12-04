import { MESSAGES } from './data.js';

const getRandonIntegerInterval = (start, end) => {
  if (start < 0 || end < 0) { return NaN; }
  if (start > end) {[start, end] = [end, start]; }
  return Math.floor(Math.random() * (end - start + 1) ) + start;
};

function debounce (callback, timeoutDelay) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

const checkMaxStringLength = (str, maxLength) => typeof(str) === 'string' && str.length >= maxLength;

checkMaxStringLength(123, 5);

const buildComments = () => {
  const countOfElemets = getRandonIntegerInterval(1, 30);
  return Array.from({length: countOfElemets}).map((_, index) => ({
    id: index + 1,
    avatar: `img/avatar-${getRandonIntegerInterval(1, 6)}.svg`,
    message: MESSAGES[getRandonIntegerInterval(0, MESSAGES.length - 1)],
    name: 'Кремлебот'
  }));
};

const getRandom = (arr, n) => {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export { getRandonIntegerInterval, buildComments, checkMaxStringLength, getRandom, debounce };
