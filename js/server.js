// // ============= СЕРВЕР ====================
const GET_DATA_ADDRESS = 'https://25.javascript.pages.academy/keksobooking/data';
const POST_DATA_ADDRESS = 'https://25.javascript.pages.academy/keksobooking';


// Получить данные с сервера
function getData(onSuccess, onError) {
    return fetch(GET_DATA_ADDRESS)
    .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
        onSuccess(data);
    })
    .catch((err) => {
        onError(err);
    });
}


// показать ошибку при загрузке объявлений пользователей
function showServerLoadError() {
    const templateFragment = document.querySelector('#popup-error').content.querySelector('.server-error');
    const messageElement = templateFragment.cloneNode(true);
    const messageParentBlock  = document.querySelector('.map');

    messageParentBlock.appendChild(messageElement);
}


// Отправить данные на сервер
function postData(onSuccess, onError, formData) {
    fetch(POST_DATA_ADDRESS,
    {
      method: 'POST',
      body: formData,
    }
    )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
}


// сделать одну функцию для показа попапа
function createPopup(status) {
    const templateFragment = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
   const messageElement = templateFragment.cloneNode(true);

   document.body.appendChild(messageElement);

   document.addEventListener('click', (evt) => {
       document.body.removeChild(messageElement);
   });


   document.addEventListener('keydown', (evt) => {
       if(evt.key === ('Escape' || 'Esc')) {
       document.body.removeChild(messageElement);
   }
   });

   if(status === 'error') {
       const postErrorBtn = messageElement.querySelector('.error__button');

       postErrorBtn.addEventListener('click', (evt) => {
       document.body.removeChild(messageElement);
   });
   }

    // фича, которой нет в тех задании:
    //     // setTimeout(() => {
    //     //     document.body.removeChild(messageElement);
    //     // }, 5000);

}


export {getData, postData, showServerLoadError, createPopup};