import {postData, createPopup} from './server.js';

// =============== ФОРМА =====================

const HOUSE_TYPE_MIN_PRICE = {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
};

const adForm = document.querySelector('.ad-form');
const adFilter = document.querySelector('.map__filters');

const fieldsets = document.querySelectorAll('fieldset');
const selects = document.querySelectorAll('select');

const disablePage = () => {
    adForm.classList.add('ad-form--disabled');
    adFilter.classList.add('ad-form--disabled');

    fieldsets.forEach((fieldset) => {
        fieldset.setAttribute('disabled', true);
    });
    selects.forEach((select) => {
        select.setAttribute('disabled', true);
    });
};

const activatePage = () => {
    adForm.classList.remove('ad-form--disabled');
    adFilter.classList.remove('ad-form--disabled');

    fieldsets.forEach((fieldset) => {
        fieldset.removeAttribute('disabled');
    });
    selects.forEach((select) => {
        select.removeAttribute('disabled');
    });
};



// ============ ВАЛИДАЦИЯ ФОРМЫ ===============


const adSubmitBtn = adForm.querySelector('.ad-form__submit');

const pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error'
});

// блокировка кнопки сабмит
const disableSubmitBtn = () => {
    adSubmitBtn.disabled = true;
};


adForm.addEventListener('input', (evt) => {
    evt.preventDefault();
    let isValid = pristine.validate();

    if(isValid) {
        adSubmitBtn.disabled = false;
    } else {
        adSubmitBtn.disabled = true;
    } 
});


// валидируем количество комнат
const adRoomsSelect = adForm.querySelector('#room_number');
const adGuestsSelect = adForm.querySelector('#capacity');


const validateRoomNumber = () => {
    let roomSelected = parseInt(adRoomsSelect.value);
    let guestsSelected = parseInt(adGuestsSelect.value);

    if(roomSelected !== 100) {
        return roomSelected >= guestsSelected && guestsSelected > 0;
    } else {
        roomSelected = 0;
        return roomSelected != guestsSelected ? false : true;
    }   
};

const getRoomErrorMessage = () => {
    if(adRoomsSelect.value == 100 || adGuestsSelect.value == 0) {
       return "Вы можете забронировать 100 комнат, выбрав опцию &quot;не для гостей&quot;";
    }
       return "Количество гостей не должно превышать количество комнат";
};


pristine.addValidator(adRoomsSelect, validateRoomNumber, getRoomErrorMessage);
pristine.addValidator(adGuestsSelect, validateRoomNumber);


// синхронизируем время заезда и выезда

const adTimeInSelect = adForm.querySelector('#timein');
const adTimeOutSelect = adForm.querySelector('#timeout');

adTimeInSelect.addEventListener('change', () => {
    adTimeOutSelect.value = adTimeInSelect.value;
});

adTimeOutSelect.addEventListener('change', () => {
    adTimeInSelect.value = adTimeOutSelect.value;
});


// валидируем тип жилья

const adHouseTypeSelect = adForm.querySelector('#type');
const adPriceInput = adForm.querySelector('#price');

adHouseTypeSelect.addEventListener('change', () => {
    let houseTypeValue = adHouseTypeSelect.value;
    adPriceInput.min = HOUSE_TYPE_MIN_PRICE[houseTypeValue];
    adPriceInput.placeholder = HOUSE_TYPE_MIN_PRICE[houseTypeValue];
});


const validatePriceNumber = () => {
    return parseInt(adPriceInput.value) >= parseInt(adPriceInput.placeholder) && parseInt(adPriceInput.value) <= parseInt(adPriceInput.max);
};


const getPriceErrorMessage = () => {
    return `Минимальная цена за данный тип жилья ${HOUSE_TYPE_MIN_PRICE[adHouseTypeSelect.value]} рублей`;
};

pristine.addValidator(adPriceInput, validatePriceNumber, getPriceErrorMessage);


// Сброс формы
const resetForm = () => {
    adForm.reset();
    pristine.reset();
};

// Отправка данных формы на сервер
adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    disableSubmitBtn();

    postData(() => {
        createPopup('success');
        resetForm();
    }, 
    () => {
        createPopup('error');
    }, 
    formData);   
});



export {activatePage, disableSubmitBtn, resetForm, disablePage, pristine, adForm, adHouseTypeSelect, adPriceInput};



