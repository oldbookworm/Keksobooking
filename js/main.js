
import './slider.js';
import './photo-loader.js';

import {getData, showServerLoadError} from './server.js';
import {turnFilterOn} from './filter.js';
import {disablePage, disableSubmitBtn} from './form.js';
import {loadMap} from './map.js';

// при открытии страница находится в неактивном состоянии
disablePage();

// загружаем данные с сервера
const loadUsersAds = () => {
    getData(onGetDataSuccess, showServerLoadError);
};

// фетчим дату
const onGetDataSuccess = (data) => {
    turnFilterOn(data);
  };

// вызываем загрузку данных и карты при загрузке страницы
window.addEventListener('load', () => {
    loadMap();  
    loadUsersAds();
    disableSubmitBtn();
});
  


