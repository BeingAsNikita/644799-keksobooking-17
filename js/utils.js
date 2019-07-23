'use strict';

(function() {


var getAvatars = function(count) {
  var avatars = [];

  for ( var i = 1; i <= count; i++) {
    avatars.push('img/avatars/user' + ((i > 9) ? i : '0'+i) + '.png');
  }
  return avatars;
};

var getNumberFromRange = function (start, end) {
  return (start + Math.ceil(Math.random()*(end-start)));
};

var getTypeOfHousing = function(types) {
  return types[getNumberFromRange(0, types.length-1)];
}

var getUniqueElementFromArray = function(arr) {
  return arr.splice(getNumberFromRange(0, arr.length-1), 1)[0];
}

window.utils = {
  getAvatars: getAvatars,
  getUniqueElement: getUniqueElementFromArray,
  getTypeOfHousing: getTypeOfHousing,
  getNumber: getNumberFromRange
}

})();
