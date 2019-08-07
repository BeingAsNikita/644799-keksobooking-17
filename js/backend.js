'use strict';

(function() {

var GET_URL = 'https://js.dump.academy/keksobooking/data';
var SEND_URL = 'https://js.dump.academy/keksobooking';
var TIMEOUT = 10000;
var OK_STATUS = 200;

var getSimpleXhr = function(url, method, onLoad, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

  if (xhr.status === OK_STATUS) {
    onLoad(xhr.response);
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
  xhr.timeout = TIMEOUT;
  xhr.open(method, url);

return xhr;
}

var getData = function(onLoad, onError) {
  var xhr = getSimpleXhr(GET_URL, 'GET', onLoad, onError);
  xhr.send();
};

var sendData = function(data, onLoad, onError) {
  var xhr = getSimpleXhr(SEND_URL, 'POST', onLoad, onError);
  xhr.send(data);
};

window.backend = {
  load: getData,
  send: sendData
};

})();
