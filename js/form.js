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
var formResetButton = document.querySelector('.ad-form__reset');

var isGuestsEqualsRooms = function() {
  var validMessage = checkCapacity(parseInt(rooms.value), parseInt(guests.value));
  if (validMessage === '') {
    rooms.setCustomValidity('');
    return true
  }
  rooms.setCustomValidity(validMessage);
  return false
}

var checkCapacity = function(numberOfRooms, numberOfGuests) {
  var message = '';

  if(numberOfRooms === 100 && numberOfGuests !== 0) {

    message = '100 комнат - не для гостей';

  } else if(numberOfRooms === 1 && numberOfGuests !== 1) {

    message = '1 комната — «для 1 гостя»';

  } else if (numberOfRooms === 2 && (numberOfGuests > 2 || numberOfGuests === 0)) {

    message = '2 комнаты — «для 2 гостей» или «для 1 гостя»';

  } else if (numberOfRooms === 3 && (numberOfGuests > 3 || numberOfGuests === 0)) {

    message = '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»';

  }

  return message;
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
    var successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    document.querySelector('main').appendChild(successPopup);

    window.utils.closingPopup(successPopup, document);
}

formResetButton.addEventListener('click', function() {
  window.map.reset();
})

typeOfHousing.addEventListener('change', function() {
  setTypeOfHousing();
})

timeIn.addEventListener('change', onChangeTimeIn);

formAd.addEventListener('submit', function(evt) {
  if(isGuestsEqualsRooms()) {
    window.backend.send(new FormData(formAd), successHandler, errorHandler);
    window.map.reset();
  }
  evt.preventDefault();
});


window.form = {
  getCoords: getAddressСoordinates,
  rooms: rooms,
  guests: guests,
  form: formAd
};

})();
