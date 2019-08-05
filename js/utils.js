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

var setActiveMode = function (elements, desabledElement) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }

  desabledElement.classList.remove('ad-form--disabled');
};

var isEscPressed = function(evt, callback, element) {
  if (evt.keyCode === ESC_KEYCODE) {
    callback(element);
  }
};



var closePopup = function(element) {
  element.remove()
};

var closingPopup = function(element, closeButton) {
  document.addEventListener('keydown', function(evt) {
    isEscPressed(evt, closePopup, element);
  });

  closeButton.addEventListener('click', function() {
    closePopup(element)
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

window.utils = {
  setActive: setActiveMode,
  setInactive: setInactiveMode,
  isEscPressed: isEscPressed,
  closingPopup: closingPopup,
  hidePins: hidePins,
  debounce: debounce
};

})();
