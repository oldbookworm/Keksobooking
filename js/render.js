import {similarAds} from './data.js';

// ======= ЗАПОЛНЕНИЕ СТРАНИЦЫ ОБЪЯВЛЕНИЯМИ ===========

const adsBlock = document.querySelector('#map-canvas');

const templateFragment = document.querySelector('#card')
.content.querySelector('.popup');

const similarAdsFragment = document.createDocumentFragment();

similarAds.forEach((ad) => {
  const adElement = templateFragment.cloneNode(true);
  
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = translateHouseType(ad.offer.type);
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} ${ad.offer.rooms > 1 ? 'комнаты' : 'комната'} для ${ad.offer.guests} ${ad.offer.guests > 1 ? 'гостей' : 'гостя'}`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;  
  
  // проверяем есть ли описание
  const adDescription = ad.offer.description;
  if(adDescription.length == 0){
    adElement.querySelector('.popup__description').classList.add('hidden');
  } else {
    adElement.querySelector('.popup__description').textContent = adDescription;
  }

  // добавляем фотографии аппартаментов:
  const photoBlock = adElement.querySelector('.popup__photos');
  const adPhoto = photoBlock.querySelector('.popup__photo');
  // очищаем блок с фотографиями, для того чтобы потом сформировать массив фото в нужном количестве
  photoBlock.removeChild(adPhoto);

  const adPhotosArr = ad.offer.photos;
  adPhotosArr.forEach((photo) => {
    const photoElement = adPhoto.cloneNode(true);
    photoElement.src = photo;
    photoBlock.appendChild(photoElement);
  });

  // разбираемся со списком удобств:
  const adFeaturesArr = ad.offer.features;
  const adFeaturesList = adElement.querySelectorAll('.popup__feature');

  adFeaturesList.forEach((featuresListItem) => {
    const isFeature = adFeaturesArr.some(
    (adFeature) => featuresListItem.classList.contains('popup__feature--' + adFeature)
    );

    if(!isFeature) {
        featuresListItem.remove();
    }
  });

  similarAdsFragment.appendChild(adElement);
});



adsBlock.appendChild(similarAdsFragment);



// перевести тип жилья 
function translateHouseType(type) {
    switch(type) {
        case 'flat':
            return 'Квартира';           
        case 'bungalow':
            return 'Бунгало';               
        case 'house':
            return 'Дом';           
        case 'palace':
            return 'Дворец';            
        case 'hotel':
            return 'Отель';                        
    }
}