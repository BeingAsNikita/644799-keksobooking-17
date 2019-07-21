'use strict';

(function() {

var QUANTITY_PINS = 8;
var adsIsrender = false;
var formFieldsets = document.querySelectorAll('fieldset');
var formFilters = document.querySelector('.map__filters').querySelectorAll('*');

var setInactiveMode = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'true');
  }
};

var setActiveMode = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }

  window.formAd.classList.remove('ad-form--disabled');

  if (!adsIsrender) {
    window.renderAds(QUANTITY_PINS);
    adsIsrender = true;
  }
};

setInactiveMode(formFieldsets);
setInactiveMode(formFilters);

window.setInactiveMode = setInactiveMode;
window.setActiveMode = setActiveMode;
window.formFieldsets = formFieldsets;
window.formFilters = formFilters;
window.adsIsrender = adsIsrender;
window.QUANTITY_PINS = QUANTITY_PINS;
})();
