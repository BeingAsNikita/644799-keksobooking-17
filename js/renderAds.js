'use strict';

(function() {

var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var MAP_PINS = document.querySelector('.map__pins');

var getSimilarAds = function(quantity) {
  var result =[];
  var avatars = window.utils.getAvatars(quantity);
  for (var i = 0; i < quantity; i++) {
     result.push({
      author: {
        avatar: window.utils.getUniqueElement(avatars)
      },
      offer: {
        type: window.utils.getTypeOfHousing(TYPE_OF_HOUSING)
      },
      location: {
        x: window.utils.getNumber(0, window.map.mapWidth - window.map.pinWidth/2),
        y: window.utils.getNumber(window.map.borderTop - window.map.pinHeight/2, window.map.borderBot - window.map.pinHeight/2)
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
  window.map.element.classList.remove('map--faded');
};

window.renderAds = {
  render: renderAds
}

})();







