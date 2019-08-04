'use strict';

(function() {

var PINS_WIDTH = 50;
var PINS_HEIGHT = 70;
var map = document.querySelector('.map');

var MAIN_PIN_START_COORDS = {
  x: 570,
  y: 375
};

var LOCATION_WIDTH = map.offsetWidth;
var LOCATION_BORDER_TOP = 130;
var LOCATION_BORDER_RIGHT = LOCATION_WIDTH;
var LOCATION_BORDER_BOT = 630;
var LOCATION_BORDER_LEFT = 0;
var ADS_COUNT_DEFAULT = 5;
var mainPin = document.querySelector('.map__pin--main');
var formFieldsets = document.querySelectorAll('fieldset');
var formFilters = document.querySelector('.map__filters').querySelectorAll('*');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pins = document.querySelector('.map__pins');
var errorPopup = document.querySelector('#error').content.querySelector('.error');
var totalAds = [];
var adsIsrender = false;
var formAd = document.querySelector('.ad-form');

var renderAd = function(ad) {
  var adElement = pinTemplate.cloneNode(true);
  adElement.style.left = ad.location.x + 'px';
  adElement.style.top = ad.location.y + 'px';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = 'Заголовок объявления';

  adElement.addEventListener('click', function() {
    window.card.render(ad);
  });

  return adElement;
};

var renderAds = function(ads) {
  totalAds = window.filter.filter(ads);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < Math.min(totalAds.length, ADS_COUNT_DEFAULT); i++) {
    fragment.appendChild(renderAd(totalAds[i]));
  }

  pins.appendChild(fragment);
  window.map.element.classList.remove('map--faded');
};

var errorHandler = function() {
  var addErrorPopup = errorPopup.cloneNode(true);
  document.body.insertAdjacentElement('afterbegin', addErrorPopup);
}


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

    if (mainPinTop < LOCATION_BORDER_TOP - PINS_HEIGHT) {
      mainPinTop = LOCATION_BORDER_TOP - PINS_HEIGHT;
    }

    if (mainPinTop > LOCATION_BORDER_BOT - PINS_HEIGHT) {
      mainPinTop = LOCATION_BORDER_BOT - PINS_HEIGHT;
    }

    if (mainPinLeft < LOCATION_BORDER_LEFT) {
      mainPinLeft = LOCATION_BORDER_LEFT;
    }

    if (mainPinLeft > LOCATION_BORDER_RIGHT - PINS_WIDTH) {
      mainPinLeft = LOCATION_BORDER_RIGHT - PINS_WIDTH;
    }

    mainPin.style.top = mainPinTop + 'px';
    mainPin.style.left = mainPinLeft + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    if (!adsIsrender) {
      window.utils.setActive(formFieldsets,formAd);
      window.utils.setActive(formFilters,formAd);
      window.backend.load(renderAds, errorHandler);
      adsIsrender = true;
    }

    window.form.getCoords(mainPin.style.left, mainPin.style.top);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


var resetMap = function() {
  window.utils.hidePins()

  mainPin.style.top = MAIN_PIN_START_COORDS.y + 'px';
  mainPin.style.left = MAIN_PIN_START_COORDS.x + 'px';

  formAd.reset();
  formAd.classList.add('ad-form--disabled');
  window.utils.setInactive(formFieldsets,formAd);
  window.utils.setInactive(formFilters,formAd);
  map.classList.add('map--faded');
  adsIsrender = false;
}

window.utils.setInactive(formFieldsets);
window.utils.setInactive(formFilters);

window.map = {
  element: map,
  pin: mainPin,
  pinWidth: PINS_WIDTH,
  pinHeight: PINS_HEIGHT,
  mapWidth: LOCATION_WIDTH,
  borderTop: LOCATION_BORDER_TOP,
  borderBot: LOCATION_BORDER_BOT,
  render: renderAds,
  error: errorHandler,
  reset: resetMap
}

})();
