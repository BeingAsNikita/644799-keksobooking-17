'use strict';

(function() {

var currentAds = [];

var filterForm = document.querySelector('.map__filters');
var filterFields = filterForm.querySelector('.map__filter');
var housingType = filterForm.querySelector('#housing-type');
var housingPrice = filterForm.querySelector('#housing-price');
var housingRooms = filterForm.querySelector('#housing-rooms');
var housingGuests = filterForm.querySelector('#housing-guests');
var housingFeaturesFieldset = filterForm.querySelector('#housing-features');


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

var getFilteredAds = function() {
  var checkedFeatures = getCheckedFeatures();
  var result = currentAds.filter( function(it) {
   return (housingType.value === 'any' || it.offer.type === housingType.value) &&
          (housingRooms.value === 'any' || it.offer.rooms === parseInt(housingRooms.value)) &&
          (housingGuests.value === 'any' || it.offer.guests === parseInt(housingGuests.value || housingGuests.value === '0')) &&
          (checkedFeatures.length === 0 || isContains(it.offer.features, checkedFeatures)) &&
          (housingPrice.value === 'any' || (housingPrice.value === 'low' && it.offer.price < 10000) ||
             (housingPrice.value === 'high' && it.offer.price >= 50000) ||
             (housingPrice.value === 'middle' && (it.offer.price > 10000 && it.offer.price < 50000)))
        });

  return result;
};

var applyFilters = function() {
  window.utils.hidePins();
  window.map.render(getFilteredAds());
};

var onFilterChanged = function() {
  window.utils.debounce(applyFilters);
};

var filterInit = function(ads) {
  currentAds = ads;

  applyFilters();
  window.utils.setActive(filterFields, filterForm);
  window.utils.setActive(housingFeaturesFieldset, filterForm);
  filterForm.addEventListener('change', onFilterChanged);
};

var filterDisable = function() {
  window.utils.hidePins();
  window.utils.setInactive(filterFields);
  window.utils.setInactive(filterFields);
  filterForm.removeEventListener('change', onFilterChanged);
};

window.utils.setInactive(filterFields);
window.utils.setInactive(filterFields);

window.filter = {
  init: filterInit,
  disable: filterDisable
};

})();
