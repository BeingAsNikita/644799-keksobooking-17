'use strict';

(function() {

var ESC_KEYCODE = 27;
var DEBOUNCE_INTERVAL = 500;
var lastTimeout = null;
var errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
var errorPopupMessage =  errorPopup.querySelector('.error__message')
var tryAgainButton = errorPopup.querySelector('.error__button');
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
  isEscEvent(evt, removePopup);
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

var onClickRemove = function(closeButton) {
  closeButton.addEventListener('click', function() {
    removePopup()
  });
};

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
  errorPopupMessage.textContent = errorMessage;
  main.appendChild(errorPopup);
  document.addEventListener('keydown', onEscPress);
  onClickRemove(tryAgainButton);
  onClickRemove(document);
};

var defaultSuccessHandler = function() {
  main.appendChild(successPopup);
  document.addEventListener('keydown', onEscPress);
  onClickRemove(document);
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
