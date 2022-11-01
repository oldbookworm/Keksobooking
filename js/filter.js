import {createBaloon, markerGroup} from './map.js';
import {debounce} from './util.js';

// ========================= ФИЛЬТР ==============================

const BALOONS_COUNT = 10;
const INPUT_DEFAULT_VALUE = 'any';

const PRICE_FILTER_RANGE = {
  low: {
      begin: 0,
      end: 10000,
  },
  middle: {
      begin: 10000,
      end: 50000,
  },
  high: {
      begin: 50000,
      end: 1000000,
  },
};

// массив полученных объявлений для фильтрации
let usersAds = [];

// зафетченную дату передаем в массив и выводим балуны
const turnFilterOn = (ads) => {
  usersAds = [...ads];
  createBaloon(usersAds.slice(0, BALOONS_COUNT));
  debounce(sortAds(usersAds));
};


// Фильтры
const filterForm = document.querySelector('.map__filters');

const houseTypeFilterInput = filterForm.querySelector('#housing-type');
const priceFilterInput = filterForm.querySelector('#housing-price');
const roomsFilterInput = filterForm.querySelector('#housing-rooms');
const guestsFilterInput = filterForm.querySelector('#housing-guests');
const featuresFilterInputs = filterForm.querySelectorAll('.map__checkbox');


// функции сортировки

const houseTypeSort = (ad) => {
    return houseTypeFilterInput.value === ad.offer.type || houseTypeFilterInput.value === INPUT_DEFAULT_VALUE;
};

const priceSort = (ad) => {
    return priceFilterInput.value === INPUT_DEFAULT_VALUE || (ad.offer.price >= PRICE_FILTER_RANGE[priceFilterInput.value].begin && ad.offer.price <= PRICE_FILTER_RANGE[priceFilterInput.value].end);
};

const roomsSort = (ad) => {
    return +roomsFilterInput.value === ad.offer.rooms || roomsFilterInput.value === INPUT_DEFAULT_VALUE;
};

const guestsSort = (ad) => {
   return +guestsFilterInput.value === ad.offer.guests || guestsFilterInput.value === INPUT_DEFAULT_VALUE;
};

const featuresSort = (ad) => Array.from(featuresFilterInputs)
  .every((filterFeature) => {
    if (!filterFeature.checked) {
      return true;
    }
    if (!ad.offer.features) {
      return false;
    }
    return ad.offer.features.includes(filterFeature.value);
  });


const sortAds = (adsArr) => {
    filterForm.addEventListener('change', (evt) => {
        markerGroup.clearLayers();

        let sortedResult = adsArr.filter(houseTypeSort).filter(priceSort).filter(roomsSort).filter(guestsSort).filter(featuresSort);

        createBaloon(sortedResult.slice(0, BALOONS_COUNT));
    });
};

export {turnFilterOn};