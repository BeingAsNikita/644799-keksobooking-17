'use strict';

var MAP = document.querySelector('.map');
var LOCATION_WIDTH = MAP.offsetWidth;
var PINS_WIDTH = 50;
var PINS_HEIGHT = 70;
var QUANTITY_PINS = 8;
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var MAP_PINS = document.querySelector('.map__pins');


var getAvatars = function(count) {
  var avatars = [];

  for ( var i = 1; i <= count; i++) {
    avatars.push('img/avatars/user' + ((i > 9) ? i : '0'+i) + '.png')
  }
  return avatars
}

var getNumberFromRange = function (start, end) {
  return (start + Math.ceil(Math.random()*(end-start)))
};

var getTypeOfHousing = function(types) {
  return types[getNumberFromRange(0, types.length-1)]
}

var getUniqueElementFromArray = function(arr) {
  return arr.splice(getNumberFromRange(0, arr.length-1), 1)[0]
}

var getSimilarAds = function(quantity) {
  var result =[];
  var avatarCopy = getAvatars(quantity).slice()
  for (var i = 0; i < quantity; i++) {
     result.push({
      author: {
        avatar: getUniqueElementFromArray(avatarCopy)
      },
      offer: {
        type: getTypeOfHousing(TYPE_OF_HOUSING)
      },
      location: {
        x: getNumberFromRange(0, LOCATION_WIDTH - PINS_WIDTH/2),
        y: getNumberFromRange(130-PINS_HEIGHT/2, 630-PINS_HEIGHT/2)
      }
    })
  }
  return result
};

var renderAd = function(ad) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = ad.location.x + 'px';
  adElement.style.top = ad.location.y + 'px';
  adElement.children[0].src = ad.author.avatar;
  adElement.children[0].alt = 'Заголовок объявления'
  return adElement
};

var renderAds = function(count) {
  var fragment = document.createDocumentFragment();
  var  ads = getSimilarAds(count)
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAd(ads[i]));
  }

  MAP_PINS.appendChild(fragment)
  MAP.classList.remove('map--faded');
};

renderAds(QUANTITY_PINS);






