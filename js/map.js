'use strict';

(function() {

var PINS_WIDTH = 50;
var PINS_HEIGHT = 70;
var MAP = document.querySelector('.map');
var LOCATION_WIDTH = MAP.offsetWidth;
var LOCATION_BORDER_TOP = 130;
var LOCATION_BORDER_RIGHT = LOCATION_WIDTH;
var LOCATION_BORDER_BOT = 630;
var LOCATION_BORDER_LEFT = 0;
var mainPin = document.querySelector('.map__pin--main');
var formFieldsets = document.querySelectorAll('fieldset');
var formFilters = document.querySelector('.map__filters').querySelectorAll('*');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var MAP_PINS = document.querySelector('.map__pins');
var errorPopup = document.querySelector('#error').content.querySelector('.error');
var totalAds = [];


var renderAd = function(ad) {
  var adElement = pinTemplate.cloneNode(true);
  adElement.style.left = ad.location.x + 'px';
  adElement.style.top = ad.location.y + 'px';
  adElement.children[0].src = ad.author.avatar;
  adElement.children[0].alt = 'Заголовок объявления';

  adElement.addEventListener('click', function() {
    window.card.render(ad);
  });

  return adElement;
};

var renderAds = function(ads) {
  totalAds = window.filter.typeOfHousingFilter(ads);

  var minAds = totalAds.length > 5 ? 5 : totalAds.length;
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < minAds; i++) {
    fragment.appendChild(renderAd(totalAds[i]));
  }

  MAP_PINS.appendChild(fragment);
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

    if (mainPinTop < LOCATION_BORDER_TOP) {
      mainPinTop = LOCATION_BORDER_TOP;
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
    if (!window.utils.statusRender) {
      window.utils.setActive(formFieldsets,window.map.render, window.map.error);
      window.utils.setActive(formFilters,window.map.render, window.map.error);
    }

    window.form.getCoords(mainPin.style.left, mainPin.style.top);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

window.utils.setInactive(formFieldsets);
window.utils.setActive(formFilters);

window.map = {
  element: MAP,
  pin: mainPin,
  pinWidth: PINS_WIDTH,
  pinHeight: PINS_HEIGHT,
  mapWidth: LOCATION_WIDTH,
  borderTop: LOCATION_BORDER_TOP,
  borderBot: LOCATION_BORDER_BOT,
  render: renderAds,
  error: errorHandler
}

})();
