'use strict';

(function() {

var filterForm = document.querySelector('.map__filters');
var housingType = document.querySelector('#housing-type');
var housingPrice = document.querySelector('#housing-price');
var housingRooms = document.querySelector('#housing-rooms');
var housingGuests = document.querySelector('#housing-guests');
var housingFeaturesFieldset = document.querySelector('#housing-features');


var getCheckedFeatures = function() {
  var features = housingFeaturesFieldset.querySelectorAll('.map__checkbox');
  var activeFeatures = [];
  for( var i = 0; i < features.length; i++) {
    if(features[i].checked) {
      activeFeatures.push(features[i].value)
    }
  }
  return activeFeatures
};

var isContains = function(where, what){
  for(var i = 0; i < what.length; i++){
    if(where.indexOf(what[i]) === -1) {
      return false;
    }
  }

  return true;
};

var filterAds = function() {
  var ads = window.map.totalAds
 window.map.render(ads.filter( function(it) {

  return (housingType.value === 'any' || it.offer.type === housingType.value) &&
         (housingRooms.value === 'any' || it.offer.rooms === parseInt(housingRooms.value)) &&
         (housingGuests.value === 'any' || it.offer.guests === parseInt(housingGuests.value || housingGuests.value === '0')) &&
         (getCheckedFeatures() === [] || isContains(it.offer.features, getCheckedFeatures())) &&
         (housingPrice.value === 'any' || (housingPrice.value === 'low' && it.offer.price < 10000) ||
            (housingPrice.value === 'high' && it.offer.price >= 50000) ||
            (housingPrice.value === 'middle' && (it.offer.price > 10000 && it.offer.price < 50000)))
       }));

};

filterForm.addEventListener('change', function() {
  window.utils.hidePins()
  window.utils.debounce(filterAds)
});

window.filter = {
  filter: filterAds
};

})();
