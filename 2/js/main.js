const getRandonIntegerInterval = function (start, end) {
  if (start < 0 || end < 0) { return NaN; }
  if (start > end) {[start, end] = [end, start]; }
  return Math.floor(Math.random() * (end - start + 1) ) + start;
};

getRandonIntegerInterval(1, 1.5);

const checkMaxStringLength = (str, maxLength) => typeof(str) === 'string' && str.length >= maxLength;


checkMaxStringLength(123, 5);