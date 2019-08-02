'use strict';

(function() {
var ESC_KEYCODE = 27;

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

var isEscPressed = function(evt, callback) {
  if (evt.keyCode === ESC_KEYCODE) {
    callback();
  }
}

window.utils = {
  setActive: setActiveMode,
  setInactive: setInactiveMode,
  isEscPressed: isEscPressed
}

})();
