'use strict';

(function() {

var ESC_KEYCODE = 27;
var DEBOUNCE_INTERVAL = 500;
var lastTimeout = null;
var errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
var errorPopupMessage =  errorPopup.querySelector('.error__message')
var successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
var main = document.querySelector('main');
var formAd = document.querySelector('.ad-form');

var setInactiveMode = function (elements) {

  Array.from(elements).forEach(function(it) {
    it.setAttribute('disabled', 'true');
  });

};

var setActiveMode = function (elements) {

  Array.from(elements).forEach(function(it){
    it.removeAttribute('disabled');
  });

  formAd.classList.remove('ad-form--disabled');
};

var  isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

var onEscPress = function(evt) {
  evt.preventDefault();
  isEscEvent(evt, function(){
    removePopup()
    document.removeEventListener('keydown', onEscPress);
  })
};

var removePopup = function() {
  if(errorPopup) {
    errorPopup.remove();
  }
  if(successPopup) {
    successPopup.remove();
  }
  document.removeEventListener('keydown', onEscPress);
}

var hidePins = function() {
  var activeAds = document.querySelectorAll('.map__pin');

  Array.from(activeAds).forEach(function(it) {
    if(!it.classList.contains('map__pin--main')) {
      it.remove();
    }
  });
};

var debounce = function (cb) {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
}

var defaultErrorHandler = function(errorMessage) {
  var tryAgainButton = errorPopup.querySelector('.error__button');

  errorPopupMessage.textContent = errorMessage;
  main.appendChild(errorPopup);
  document.addEventListener('keydown', onEscPress);

  tryAgainButton.addEventListener('click', removePopup)
  document.addEventListener('click', removePopup)
};

var defaultSuccessHandler = function() {
  main.appendChild(successPopup);
  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', removePopup)
};

window.utils = {
  setActive: setActiveMode,
  setInactive: setInactiveMode,
  isEscPressed: isEscEvent,
  hidePins: hidePins,
  debounce: debounce,
  error: defaultErrorHandler,
  success: defaultSuccessHandler
};

})();
