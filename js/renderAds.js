'use strict';

(function() {

var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var MAP_PINS = document.querySelector('.map__pins');
var formAd = document.querySelector('.ad-form');

var getSimilarAds = function(quantity) {
  var result =[];
  var avatars = window.getAvatars(quantity);
  for (var i = 0; i < quantity; i++) {
     result.push({
      author: {
        avatar: window.getUniqueElementFromArray(avatars)
      },
      offer: {
        type: window.getTypeOfHousing(TYPE_OF_HOUSING)
      },
      location: {
        x: window.getNumberFromRange(0, window.LOCATION_WIDTH - window.PINS_WIDTH/2),
        y: window.getNumberFromRange(window.LOCATION_BORDER_TOP - window.PINS_HEIGHT/2, window.LOCATION_BORDER_BOT - window.PINS_HEIGHT/2)
      }
    })
  }
  return result;
};

var renderAd = function(ad) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = ad.location.x + 'px';
  adElement.style.top = ad.location.y + 'px';
  adElement.children[0].src = ad.author.avatar;
  adElement.children[0].alt = 'Заголовок объявления';
  return adElement;
};

var renderAds = function(count) {
  var fragment = document.createDocumentFragment();
  var  ads = getSimilarAds(count);
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAd(ads[i]));
  }

  MAP_PINS.appendChild(fragment);
  window.MAP.classList.remove('map--faded');
};

window.renderAds = renderAds;
window.formAd = formAd;
})();







