'use strict';

(function() {

var QUANTITY_PINS = 8;
var adsIsrender = false;
var formFieldsets = document.querySelectorAll('fieldset');
var formFilters = document.querySelector('.map__filters').querySelectorAll('*');
var formAd = document.querySelector('.ad-form');

var setInactiveMode = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'true');
  }
};

var setActiveMode = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }

  formAd.classList.remove('ad-form--disabled');

  if (!adsIsrender) {
    window.renderAds.render(QUANTITY_PINS);
    adsIsrender = true;
  }
};

setInactiveMode(formFieldsets);
setInactiveMode(formFilters);

window.mode = {
  setActive: setActiveMode,
  setInactive: setInactiveMode,
  fieldsets: formFieldsets,
  filters: formFilters,
  statusRender: adsIsrender,
}

})();
