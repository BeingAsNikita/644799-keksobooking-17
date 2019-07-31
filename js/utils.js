'use strict';

(function() {

var adsIsrender = false;

var formAd = document.querySelector('.ad-form');

var setInactiveMode = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'true');
  }
};

var setActiveMode = function (elements, render, error) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }

  formAd.classList.remove('ad-form--disabled');

  if (!adsIsrender) {
    window.backend.load(render, error);
    adsIsrender = true;
  }
};

var getAvatars = function(count) {
  var avatars = [];

  for ( var i = 1; i <= count; i++) {
    avatars.push('img/avatars/user' + ((i > 9) ? i : '0'+i) + '.png');
  }
  return avatars;
};

var getNumberFromRange = function (start, end) {
  return (start + Math.ceil(Math.random()*(end-start)));
};

var getTypeOfHousing = function(types) {
  return types[getNumberFromRange(0, types.length-1)];
}

var getUniqueElementFromArray = function(arr) {
  return arr.splice(getNumberFromRange(0, arr.length-1), 1)[0];
}



window.utils = {
  getAvatars: getAvatars,
  getUniqueElement: getUniqueElementFromArray,
  getTypeOfHousing: getTypeOfHousing,
  getNumber: getNumberFromRange,
  setActive: setActiveMode,
  setInactive: setInactiveMode,
  statusRender: adsIsrender,
}

})();
