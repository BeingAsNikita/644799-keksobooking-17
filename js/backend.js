'use strict';

(function() {

var GET_URL = 'https://js.dump.academy/keksobooking/data';
var SEND_URL = 'https://js.dump.academy/keksobooking';

var initRequest = function(onLoad, onError, URL, method,data) {
   var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function() {
    if(xhr.status === 200) {
      onLoad(xhr.response)
    } else {
      onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 10000;

  xhr.open(method, URL);
  xhr.send(data);

}

var getData = function(onLoad, onError) {
  initRequest(onLoad, onError, GET_URL, 'GET', '');
};

var sendData = function(data, onLoad, onError) {
  initRequest(onLoad, onError, SEND_URL, 'POST', data);
};

window.backend = {
  load: getData,
  send: sendData
};

})();
