'use strict';

(function() {

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var MAP_PINS = document.querySelector('.map__pins');
var errorPopup = document.querySelector('#error').content.querySelector('.error');

var renderAd = function(ad) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = ad.location.x + 'px';
  adElement.style.top = ad.location.y + 'px';
  adElement.children[0].src = ad.author.avatar;
  adElement.children[0].alt = 'Заголовок объявления';
  return adElement;
};

var renderAds = function(ads) {

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAd(ads[i]));
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







