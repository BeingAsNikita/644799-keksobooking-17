'use strict';

(function() {
var formAd = document.querySelector('.ad-form');
var address = document.querySelector('#address');
var typeOfHousing = document.querySelector('#type');
var price = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var rooms = document.querySelector('#room_number');
var guests = document.querySelector('#capacity');


var isGuestsEqualsRooms = function() {
  if(rooms.value >= guests.value ) {
    return true
  } else {
    rooms.setCustomValidity('Число комнат не соответствует числу гостей');
    return false
  }
  formAd.removeEventListener('submit', isGuestsEqualsRooms);
}

var onChangeTimeIn = function(evt) {
  timeOut.value = evt.target.value;
}

var setTypeOfHousing = function() {
  var min = 0;
  switch(typeOfHousing.value) {
    case "bungalo":
      min = 0
    break;
    case "flat":
      min = 1000
    break;
    case "house":
      min = 5000
    break;
    case "palace":
      min = 10000
    break;
  }

  price.setAttribute('min', min);
  price.setAttribute('placeholder', min);
}

var getAddressСoordinates = function(left, top) {
  address.value = (parseInt(left, 10) + window.map.pinWidth/2) + ', ' + (parseInt(top, 10) + window.map.pinHeight);
}

var errorHandler = function(errorMessage) {
  var errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

  errorPopup.querySelector('.error__message').textContent = errorMessage;
  document.querySelector('main').appendChild(errorPopup);

}

var successHandler = function() {
  if (isGuestsEqualsRooms())

  var errorPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.querySelector('main').appendChild(errorPopup);
}

typeOfHousing.addEventListener('change', function() {
  setTypeOfHousing();
})

timeIn.addEventListener('change', onChangeTimeIn);

formAd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  window.backend.send(new FormData(formAd), successHandler, errorHandler);
});


window.form = {
  getCoords: getAddressСoordinates,
  rooms: rooms,
  guests: guests
};

})();
