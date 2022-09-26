export {getRandomNumber, getRandomFloat, getRandomArrayElement, getRandomArray};


// ================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =============

// получить рандомное число
function getRandomNumber(a, b) {
    const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (max - min + 1) + min;
     return Math.floor(result);
  }

// получить рандомное число с плавающей точкой
function getRandomFloat(a, b, decimal) {
    const min = Math.min(Math.abs(a), Math.abs(b));
    const max = Math.max(Math.abs(a), Math.abs(b));
    const result = Math.random() * (max - min) + min;
    return +result.toFixed(decimal);
}

// получить рандомный элемент массива
function getRandomArrayElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}


// тасуем массив
function shuffle(array) {
  for(let i = array.length-1; i>0; i--) {
    let j = Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// получаем массив случайной длины из неповторяющихся значений
function getRandomArray(arr, maxLength) {
    const arrLength = getRandomNumber(1, +maxLength);
    const shuffledArr = shuffle(arr);
    const newArr = [];
    for (let i = 0; i <= arrLength; i++) {
     newArr.push(shuffledArr[i]);
    }
    return newArr;
}

