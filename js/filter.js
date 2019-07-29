'use strict';

(function() {

var typeOfHousingFilter = document.querySelector('#housing-type');

var filterByTypeOfHousing = function(ads) {
  if (typeOfHousingFilter.value === 'any') {
    return ads
  }
     return ads.filter( function(it) {
      return it.offer.type === typeOfHousingFilter.value;
    })

};


var hideAds = function() {
  var activeAds = document.querySelectorAll('.map__pin');
  for (var i = 0; i < activeAds.length; i++) {
    activeAds[i].remove();
  }
}

typeOfHousingFilter.addEventListener('change', function() {
  hideAds();
  window.backend.load(window.renderAds.render, window.renderAds.error);
})

window.filter = {
  typeOfHousingFilter: filterByTypeOfHousing
}

})();
