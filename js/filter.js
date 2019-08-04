'use strict';

(function() {

var filterForm = document.querySelector('.map__filters');

var housingType = document.querySelector('#housing-type');
var housingPrice = document.querySelector('#housing-price');
var housingRooms = document.querySelector('#housing-rooms');
var housingGuests = document.querySelector('#housing-guests');
var housingFeaturesFieldset = document.querySelector('#housing-features');

var filteredAds = [];

var getCheckedFeatures = function() {
  var features = housingFeaturesFieldset.querySelectorAll('.map__checkbox');
  var activeFeatures = [];
  for( var i = 0; i < features.length; i++) {
    if(features[i].checked) {
      activeFeatures.push(features[i].value)
    }
  }
  return activeFeatures
}

var filterAds = function(ads) {
  filteredAds = ads;
  if (housingType.value === 'any' &&
      housingPrice.value === 'any' &&
      housingRooms.value === 'any' &&
      housingGuests.value === 'any' &&
      getCheckedFeatures() === []) {
    return filteredAds
  }

  if (housingType.value !== 'any') {
    filteredAds = filteredAds.filter( function(it) {
      return it.offer.type === housingType.value
    });
  }

  if (housingRooms.value !== 'any') {
    filteredAds = filteredAds.filter( function(it) {
      return it.offer.rooms === parseInt(housingRooms.value) ;
    });
  }

  if (housingPrice.value !== 'any') {
    if(housingPrice.value === 'low') {
      filteredAds = filteredAds.filter( function(it) {
        return it.offer.price < 10000 ;
      });
    } else if(housingPrice.value === 'high') {
      filteredAds = filteredAds.filter( function(it) {
        return it.offer.price >= 50000 ;
      });
    } else if(housingPrice.value === 'middle') {
      filteredAds = filteredAds.filter( function(it) {
        return it.offer.price > 10000 && it.offer.price < 50000;
      });
    }
  }

  if (housingGuests.value !== 'any') {
    if(housingGuests.value == '0') {
      filteredAds = filteredAds.filter( function(it) {
        return it.offer.guests > 3 ;
      });
    } else {
      filteredAds = filteredAds.filter( function(it) {
        return it.offer.guests === parseInt(housingGuests.value) ;
      });
    }
  }

  filteredAds = filteredAds.filter( function(it) {
    return window.utils.contains(it.offer.features, getCheckedFeatures()) === true;
  });


  return filteredAds
};

/*housingType.addEventListener('change', function() {
  window.utils.hidePins()
  window.backend.load(window.map.render, window.map.error);
});

housingPrice.addEventListener('change', function() {
  window.utils.hidePins()
  window.backend.load(window.map.render, window.map.error);
});

housingRooms.addEventListener('change', function() {
  window.utils.hidePins()
  window.backend.load(window.map.render, window.map.error);
});

housingGuests.addEventListener('change', function() {
  window.utils.hidePins()
  window.backend.load(window.map.render, window.map.error);
});*/

filterForm.addEventListener('change', function() {
  window.utils.hidePins()
  window.backend.load(window.utils.debounce(window.map.render), window.map.error)
})

window.filter = {
  filter: filterAds
}

})();
