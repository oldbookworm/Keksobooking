// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

// проверка на правильность ввода числа
function validateNumber(min, max) {
  if(isNaN(min) || isNaN (max)) {
    alert('Введеное значение не является числом');
  } else if(min >= max || min < 0) {
    alert('Минимальное число больше максимального или равно ему, введите правильный диапазон');
  } else {
    return min, max;
  }
  }
  
  // получить рандомное число
  function getRandomNumber(min, max) {
    validateNumber(min, max);
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  // получить рандомное число с плавающей точкой
  function getRandomFloat(min, max, decimal) {
    validateNumber(min, max);
    const floatNumber = min + Math.random() * (max - min);
    return floatNumber.toFixed(decimal);
  }

