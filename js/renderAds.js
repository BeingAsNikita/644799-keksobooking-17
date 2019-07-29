'use strict';

(function() {

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

window.renderAds = {
  render: renderAds,
  error: errorHandler
}

})();







