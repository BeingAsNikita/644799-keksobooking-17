'use strict';

(function() {
var formAd = document.querySelector('.ad-form');
var adTitle = document.querySelector('#title');
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
  rooms.setCustomValidity(validMessage);
  return validMessage ==='';
};

var checkTitleLength = function() {
  var titleLength = adTitle.value.length;

  if (titleLength < 30 || titleLength > 100) {
    adTitle.setCustomValidity('Минимальная длина — 30 символов, максимальная длина — 100 символов.')
  } else {
   adTitle.setCustomValidity('');
   return true
  }
};

var checkRequired = function() {
 var priceLength = price.value.length
    if (priceLength === 0) {
    price.setCustomValidity('Обязательное поле для заполнения')
  } else {
   price.setCustomValidity('');
   return true
  }
};

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
};

var onChangeTime = function(evt, element) {
  element.value = evt.target.value;
};

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
};

var getAddressСoordinates = function(left, top) {
  address.value = (parseInt(left, 10) + window.map.pinWidth/2) + ', ' + (parseInt(top, 10) + window.map.pinHeight);
};

var successHandler = function() {
    var successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    document.querySelector('main').appendChild(successPopup);

    window.utils.closingPopup(successPopup, document);
};


adTitle.addEventListener('change', checkTitleLength);

price.addEventListener('change', checkRequired)

typeOfHousing.addEventListener('change', setTypeOfHousing);

timeIn.addEventListener('change', function(evt) {
  onChangeTime(evt, timeOut)
});

timeOut.addEventListener('change', function(evt) {
   onChangeTime(evt, timeIn)
});

guests.addEventListener('change', isGuestsEqualsRooms);

rooms.addEventListener('change', isGuestsEqualsRooms);

formResetButton.addEventListener('click', window.map.reset);

formAd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  if(isGuestsEqualsRooms() &&
      checkTitleLength() &&
      checkRequired()) {
    window.backend.send(new FormData(formAd), successHandler, window.utils.error);
    window.map.reset();
  }
});

window.form = {
  getCoords: getAddressСoordinates,
  rooms: rooms,
  guests: guests,
  form: formAd
};

})();
