'use strict';

(function() {

var PINS_WIDTH = 50;
var PINS_HEIGHT = 70;
var address = document.querySelector('#address');
var typeOfHousing = document.querySelector('#type');
var price = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var period = function() {
    switch(timeIn.value) {
      case "12:00":
        timeOut.selectedIndex = 0;
      break;
      case "13:00":
        timeOut.selectedIndex = 1;
      break;
      case "14:00":
        timeOut.selectedIndex = 2;
      break;
    }
}

var setTypeOfHousing = function() {
  switch(typeOfHousing.value) {
    case "bungalo":
      price.setAttribute('min', '0');
      price.setAttribute('placeholder', '0');
    break;
    case "flat":
      price.setAttribute('min', '1000');
      price.setAttribute('placeholder', '1000');
    break;
    case "house":
      price.setAttribute('min', '5000');
      price.setAttribute('placeholder', '5000');
    break;
    case "palace":
      price.setAttribute('min', '10000');
      price.setAttribute('placeholder', '10000');
    break;
  }
}

var getAddressСoordinates = function() {
  address.value = (parseInt(window.mainPin.style.left, 10) + PINS_WIDTH/2) + ', ' + (parseInt(window.mainPin.style.top, 10) + PINS_HEIGHT);
}

typeOfHousing.addEventListener('change', function() {
  setTypeOfHousing();
})

timeIn.addEventListener('change', function() {
  period();
})

window.PINS_WIDTH = PINS_WIDTH;
window.PINS_HEIGHT = PINS_HEIGHT;
window.getAddressСoordinates = getAddressСoordinates;
})();
