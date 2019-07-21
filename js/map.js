'use strict';

(function() {

var MAP = document.querySelector('.map');
var LOCATION_WIDTH = MAP.offsetWidth;
var LOCATION_BORDER_TOP = 130;
var LOCATION_BORDER_RIGHT = LOCATION_WIDTH;
var LOCATION_BORDER_BOT = 630;
var LOCATION_BORDER_LEFT = 0;
var mainPin = document.querySelector('.map__pin--main');

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var mainPinTop = mainPin.offsetTop - shift.y;
    var mainPinLeft = mainPin.offsetLeft - shift.x;

    if (mainPinTop < LOCATION_BORDER_TOP) {
      mainPinTop = LOCATION_BORDER_TOP;
    }

    if (mainPinTop > LOCATION_BORDER_BOT - window.PINS_HEIGHT) {
      mainPinTop = LOCATION_BORDER_BOT - window.PINS_HEIGHT;
    }

    if (mainPinLeft < LOCATION_BORDER_LEFT) {
      mainPinLeft = LOCATION_BORDER_LEFT;
    }

    if (mainPinLeft > LOCATION_BORDER_RIGHT - window.PINS_WIDTH) {
      mainPinLeft = LOCATION_BORDER_RIGHT - window.PINS_WIDTH;
    }

    mainPin.style.top = mainPinTop + 'px';
    mainPin.style.left = mainPinLeft + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    if (!window.adsIsrender) {
      window.setActiveMode(window.formFieldsets);
      window.setActiveMode(window.formFilters);
    }

    window.getAddressСoordinates();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

window.LOCATION_WIDTH = LOCATION_WIDTH;
window.MAP = MAP;
window.mainPin = mainPin;
window.LOCATION_BORDER_TOP = LOCATION_BORDER_TOP;
window.LOCATION_BORDER_BOT = LOCATION_BORDER_BOT;
})();
