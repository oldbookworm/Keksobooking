
import './render.js';
import './form.js';
import './map.js';
import './slider.js';
import './server.js';
import './filter.js';
import './photo-loader.js';

import {getData, showServerLoadError} from './server.js';
import {turnFilterOn} from './filter.js';


// загружаем данные с сервера
function loadUsersAds() {
    getData(onGetDataSuccess, showServerLoadError);
}

// фетчим дату
function onGetDataSuccess (data) {
    turnFilterOn(data);
  }

// вызываем загрузку данных при загрузке страницы
window.addEventListener('load', () => {
    loadUsersAds();
});
  
  

