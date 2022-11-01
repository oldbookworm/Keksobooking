
import {createMapCard} from './render.js';
import {activatePage, adForm, pristine, resetForm} from './form.js';


// ============ КАРТА ===================
const map = L.map('map-canvas');

const loadMap = () => {

  map.on('load', () => {
    activatePage();
    })
  .setView({
    lat: 35.658581,
    lng: 139.745438,
  }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);
};



// создаем главный маркер

const mapMainIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  
  const mapMainMarker = L.marker(
    {
      lat: 35.658581,
      lng: 139.745438,
    },
    {
      draggable: true,
      icon: mapMainIcon,
    }
  );
  
  mapMainMarker.addTo(map);



  // реализуем выбор адреса маркером

const addressInput = document.querySelector('#address');

mapMainMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng(); 
    const lat = coordinates.lat;
    const lng = coordinates.lng;
    addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    pristine.validate(addressInput);
});


// сброс при сабмите и ресете
const formResetBtn = document.querySelector('.ad-form__reset');

adForm.addEventListener('submit', () => {
  mapMainMarker.setLatLng({
    lat: 35.658581,
    lng: 139.745438,
  });

  map.setView({
    lat: 35.658581,
    lng: 139.745438,
  }, 12);

});

formResetBtn.addEventListener('click', () => {
  mapMainMarker.setLatLng({
    lat: 35.658581,
    lng: 139.745438,
  });

  map.setView({
    lat: 35.658581,
    lng: 139.745438,
  }, 12);

  resetForm();
});


// Вставка балунов и маркеров с похожими объявлениями

const userIcon  = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const markerGroup = L.layerGroup().addTo(map);


const createBaloon = (elems) => {

    elems.forEach((elem) => {
        const lat = elem.location.lat;
        const lng = elem.location.lng;

        const userMarker = L.marker({
            lat,
            lng,
        },
        {
            userIcon,
        }
    );

    userMarker.addTo(markerGroup).bindPopup(createMapCard(elem));

    });
};


export {createBaloon, loadMap, markerGroup};