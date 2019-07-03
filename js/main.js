'use strict';
var MAP = document.querySelector('.map');
var LOCATION_WIDTH = MAP.offsetWidth;
var PINS_WIDTH = 50;
var PINS_HEIGHT = 70;
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var MAP_PINS = document.querySelector('.map__pins');
var similarAds = [];



var getNumber = function (start, end) {
  var rand = start - 0.5 + Math.random() * (end - start + 1);
  rand = Math.round(rand);
  return rand;
}

var getAvatar  = function() {
  return 'img/avatars/user0' + getNumber(1,8) + '.png'
}

var getTypeOfHousing = function(types) {
  return types[getNumber(0, types.length-1)]
}

var getSimilarAds = function(quantity) {
  for (var i = 0; i < quantity; i++) {
    var similarAd = {
      author: {
        avatar: getAvatar()
      },
      offer: {
        type: getTypeOfHousing(TYPE_OF_HOUSING)
      },
      location: {
        x: getNumber(0,LOCATION_WIDTH - PINS_WIDTH/2),
        y: getNumber(130-PINS_HEIGHT/2,630-PINS_HEIGHT/2)
      }
    }
    similarAds.push(similarAd)
  }
}
getSimilarAds(8)

var renderAd = function(ad) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = ad.location.x + 'px';
  adElement.style.top = ad.location.y + 'px';
  adElement.children[0].src = ad.author.avatar;
  adElement.children[0].alt = 'Заголовок объявления'
  return adElement
}

MAP.classList.remove('map--faded');

var fragment = document.createDocumentFragment();

for (var i = 0; i < similarAds.length; i++) {
  fragment.appendChild(renderAd(similarAds[i]));

}
  console.log(MAP_PINS.appendChild(fragment))
MAP_PINS.appendChild(fragment)

