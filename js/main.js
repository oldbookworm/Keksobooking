// ============= DATA ================

const AVATAR_URLS = getAvatarUrls(10);
const LATITUDE = getRandomFloat(35.65000, 35.70000, 5);
const LONGITUDE = getRandomFloat(139.70000, 139.80000, 5);

const CHECKIN_CHECKOUT_DATE = [
'12:00',
'13:00',
'14:00'
];

const AD_TITLE = [
'Уютная студия в центре', 
'Квартира в 5 минутах до метро', 
'Чисто и недорого', 
'Бабушкин ремонт', 
'Срочно!', 
'Современный комфорт', 
'Квартира в длительную аренду', 
'Стильный лофт', 
'Сдам семье с детьми и домашними животными', 
'Огромные апартаменты для полиаморной семьи'
];

const AD_HOUSE_TYPE = [
'palace',
'flat',
'house',
'bungalow',
'hotel'
];

const AD_FEATURES = [
'wifi',
'dishwasher',
'parking',
'washer',
'elevator',
'conditioner'
];

const AD_DESCRIPTION = [
'Комфортное светлое жилье с шикарным видом на городской парк',
'Тихий район, идеально для спокойной удаленной работы',
'В двух шагах вино-водочный магазин',
'Вас ждут: огромная кровать, ортопедический матрас, подушки с памятью и утяжеленное одеяло',
'Тесно, да не в обиде',
'Люкс, шик, красота',
'Приехали потусоваться? Останавливайтесь у нас!',
'Туалет на улице',
'Без посредников',
];

const AD_PHOTOS = [
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

// ================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =============


// получить рандомное число
function getRandomNumber(a, b) {
    const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (max - min + 1) + min;
     return Math.floor(result);
  }

// получить рандомное число с плавающей точкой
function getRandomFloat(a, b, decimal) {
    const min = Math.min(Math.abs(a), Math.abs(b));
    const max = Math.max(Math.abs(a), Math.abs(b));
    const result = Math.random() * (max - min) + min;
    return +result.toFixed(decimal);
}

// получить рандомный элемент массива
function getRandomArrayElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}


// тасуем массив
function shuffle(array) {
  for(let i = array.length-1; i>0; i--) {
    let j = Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// получаем массив случайной длины из неповторяющихся значений
function getRandomArray(arr, maxLength) {
    const arrLength = getRandomNumber(1, +maxLength);
    const shuffledArr = shuffle(arr);
    const newArr = [];
    for (let i = 0; i <= arrLength; i++) {
     newArr.push(shuffledArr[i]);
    }
    return newArr;
}




// ================ ГЕНЕРАЦИЯ ОБЪЕКТОВ ====================

// создаем объект объявления
function createAd() {
  return {
    author: {
        avatar: getRandomArrayElement(AVATAR_URLS),
    },
    offer: {
        title: getRandomArrayElement(AD_TITLE),
        address: `${LATITUDE}, ${LONGITUDE}`,
        price: getRandomNumber(2000, 50000),
        type:  getRandomArrayElement(AD_HOUSE_TYPE),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: getRandomArrayElement(CHECKIN_CHECKOUT_DATE),
        checkout: getRandomArrayElement(CHECKIN_CHECKOUT_DATE),
        features: getRandomArray(AD_FEATURES, AD_FEATURES.length - 1),
        description: getRandomArrayElement(AD_DESCRIPTION),
        photos: getRandomArray(AD_PHOTOS, AD_PHOTOS.length - 1),
    },
    location: {
        lat: LATITUDE,
        lng: LONGITUDE,
    },
  }; 
}

// генерируем массив с адресами аватарок
function getAvatarUrls(urlsNumbers) {
   const avatarUrls = [];
   for (let i = 1; i <= urlsNumbers; i++) {
    let url;
    i < 10 ? url = `img/avatars/user0${i}.png` : url = `img/avatars/user${i}.png`;
    avatarUrls.push(url);
   }
   return avatarUrls;
}

// создаем массив объявлений
const similarAds = Array.from({length: 10}, createAd);

console.log(similarAds);

