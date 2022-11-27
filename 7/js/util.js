import { MESSAGES } from './data.js';


const getRandonIntegerInterval = (start, end) => {
  if (start < 0 || end < 0) { return NaN; }
  if (start > end) {[start, end] = [end, start]; }
  return Math.floor(Math.random() * (end - start + 1) ) + start;
};

const checkMaxStringLength = (str, maxLength) => typeof(str) === 'string' && str.length >= maxLength;

checkMaxStringLength(123, 5);

const buildComments = () => {
  const countOfElenets = getRandonIntegerInterval(1, 5);
  return Array.from({length: countOfElenets}).map((_, index) => ({
    id: index + 1,
    avatar: `img/avatar-${getRandonIntegerInterval(1, 6)}.svg`,
    message: MESSAGES[getRandonIntegerInterval(0, MESSAGES.length - 1)],
    name: 'Кремлебот'
  }));
};

export { getRandonIntegerInterval, buildComments, checkMaxStringLength };
