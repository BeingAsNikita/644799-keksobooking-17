'use strict';

(function() {

var ESC_KEYCODE = 27;
var DEBOUNCE_INTERVAL = 500;
var lastTimeout = null;

var setInactiveMode = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'true');
  }
};

var setActiveMode = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }

  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
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
  for (var i = 0; i < activeAds.length; i++) {
    if(!activeAds[i].classList.contains('map__pin--main')) {
      activeAds[i].remove();
    }
  }
};

var debounce = function (cb) {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
}

var defaultErrorHandler = function(errorMessage) {
  var errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var tryAgainButton = errorPopup.querySelector('.error__button');

  errorPopup.querySelector('.error__message').textContent = errorMessage;
  document.querySelector('main').appendChild(errorPopup);
  window.utils.closingPopup(errorPopup, tryAgainButton);

};

window.utils = {
  setActive: setActiveMode,
  setInactive: setInactiveMode,
  isEscPressed: isEscPressed,
  closingPopup: closingPopup,
  hidePins: hidePins,
  debounce: debounce,
  error: defaultErrorHandler,
};

})();
