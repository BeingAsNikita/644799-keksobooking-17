'use strict';

(function() {


var address = document.querySelector('#address');
var typeOfHousing = document.querySelector('#type');
var price = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

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

typeOfHousing.addEventListener('change', function() {
  setTypeOfHousing();
})

timeIn.addEventListener('change', onChangeTimeIn);

window.form = {
  getCoords: getAddressСoordinates
};

})();
