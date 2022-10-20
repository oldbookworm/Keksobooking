
import './render.js';
import './form.js';
import './map.js';
import './slider.js';
import './server.js';

import {getData, showServerLoadError} from './server.js';
import {createBaloon} from './map.js';


// загружаем данные с сервера
function loadUsersAds() {
    getData(createBaloon, showServerLoadError);
}

// вызываем загрузку данных при загрузке страницы
window.addEventListener('load', () => {
    loadUsersAds();
});


