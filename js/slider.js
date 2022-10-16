import {adForm, pristine, adHouseTypeSelect, adPriceInput} from './form.js';

// =========== СЛАЙДЕР ДЛЯ ПОКАЗА ЦЕНЫ ЗА НОЧЬ ===============

const priceSlider = adForm.querySelector('.ad-form__slider');


noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
},
});

adHouseTypeSelect.addEventListener('change', () => {
    let sliderMinRange = parseInt(adPriceInput.placeholder);
    priceSlider.noUiSlider.set(sliderMinRange);
});


priceSlider.noUiSlider.on('update', () => {
  adPriceInput.value = priceSlider.noUiSlider.get();
  pristine.validate(adPriceInput);
});