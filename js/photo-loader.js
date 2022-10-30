import {adForm} from './form.js';

// ====================== ЗАГРУЗКА ФОТОГРАФИИ =========================

const avatarUpload = adForm.querySelector('.ad-form__field');
const avatarUploadInput = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview > img');

const housePhotoUpload = adForm.querySelector('.ad-form__upload');
const housePhotoInput = adForm.querySelector('#images');
const housePhotoPreview = adForm.querySelector('.ad-form__photo');


const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// проверяем является ли загруженное фотографиями 
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

// загрузка аватарки
avatarUpload.addEventListener('change', () => {
    const file = avatarUploadInput.files[0];

    if (file && isValidType(file)) {
        avatarPreview.src = URL.createObjectURL(file);
    }
});

// загрузка фото дома
housePhotoUpload.addEventListener('change', () => {
    const file = housePhotoInput.files[0];

    if (file && isValidType(file)) {      
            const picture = document.createElement('img');
            picture.src = URL.createObjectURL(file);
            picture.width = '40';
            picture.height = '40';
            housePhotoPreview.appendChild(picture);
    }
});