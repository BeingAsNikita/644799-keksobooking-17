'use strict';

(function() {

var housingType = document.querySelector('#housing-type');
var housingPrice = document.querySelector('#housing-price');
var housingRooms = document.querySelector('#housing-rooms');
var housingGuests = document.querySelector('#housing-guests');
var housingFeaturesFieldset = document.querySelector('#housing-features');

var filteredAds = [];
var activeFeatures = [];

var getFeatures = function() {
  var features = housingFeaturesFieldset.querySelectorAll('.map__checkbox');
  for( var i = 0; i < features.length; i++) {
    if(features[i].checked) {
      activeFeatures.push(features[i].value)
    }
  }
  return activeFeatures
}
getFeatures();


var filterAds = function(ads) {
  filteredAds = ads;
  if (housingType.value === 'any' &&
      housingPrice.value === 'any' &&
      housingRooms.value === 'any' &&
      housingGuests.value === 'any') {
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

  return filteredAds
};


var hideAds = function() {
  var activeAds = document.querySelectorAll('.map__pin');
  for (var i = 0; i < activeAds.length; i++) {
    activeAds[i].remove();
  }
}

housingType.addEventListener('change', function() {
  hideAds();

  window.backend.load(window.map.render, window.map.error);
});

housingPrice.addEventListener('change', function() {
  hideAds();
  window.backend.load(window.map.render, window.map.error);
});

housingRooms.addEventListener('change', function() {
  hideAds();
  window.backend.load(window.map.render, window.map.error);
});

housingGuests.addEventListener('change', function() {
  hideAds();
  window.backend.load(window.map.render, window.map.error);
});

window.filter = {
  filter: filterAds
}

})();
