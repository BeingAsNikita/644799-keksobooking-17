'use strict';

(function() {

var ESC_KEYCODE = 27;
var DEBOUNCE_INTERVAL = 500;
var lastTimeout = null;
var errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
var errorPopupMessage =  errorPopup.querySelector('.error__message')
var tryAgainButton = errorPopup.querySelector('.error__button');
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

var isEscPressed = function(evt, callback, element) {
  if (evt.keyCode === ESC_KEYCODE) {
    callback(element);
  }
};

var onClosePopup = function(element) {
  element.remove()
};

var closingPopup = function(element, closeButton) {
  document.addEventListener('keydown', function(evt) {
    isEscPressed(evt, onClosePopup, element);
  });

  closeButton.addEventListener('click', function() {
    onClosePopup(element)
    document.removeEventListener('keydown', isEscPressed, element);
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
  window.utils.closingPopup(errorPopup, tryAgainButton);
};

window.utils = {
  setActive: setActiveMode,
  setInactive: setInactiveMode,
  isEscPressed: isEscPressed,
  closingPopup: closingPopup,
  closePopup: onClosePopup,
  hidePins: hidePins,
  debounce: debounce,
  error: defaultErrorHandler,
};

})();
