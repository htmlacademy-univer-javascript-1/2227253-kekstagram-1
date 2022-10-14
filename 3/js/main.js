const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


const getRandonIntegerInterval = function (start, end) {
  if (start < 0 || end < 0) { return NaN; }
  if (start > end) {[start, end] = [end, start]; }
  return Math.floor(Math.random() * (end - start + 1) ) + start;
};

const checkMaxStringLength = (str, maxLength) => typeof(str) === 'string' && str.length >= maxLength;

checkMaxStringLength(123, 5);

const buildComments = function(){
  const countOfElenets = getRandonIntegerInterval(1, 5);
  return Array.from({length: countOfElenets}).map((_, index) => ({
    id: index + 1,
    avatar: `img/avatar-${getRandonIntegerInterval(1, 6)}.svg`,
    message: MESSAGES[getRandonIntegerInterval(0, MESSAGES.length - 1)],
    name: 'Кремлебот'
  }));
};

const photos = Array.from({length:25}).map((_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: 'Обычная фотография',
  likes: getRandonIntegerInterval(15, 200),
  comments: buildComments()
}));

photos.forEach(); // заглушка для избежания ошибок
