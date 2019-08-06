'use strict';

(function() {
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var types = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var addPhotos = function(ad, element) {
  var photos = ad.offer.photos;
  var fragment = document.createDocumentFragment();
  var photo = element.querySelector('.popup__photo');

  photos.forEach( function(it) {
    var image = photo.cloneNode(true);
    image.src = it;
    fragment.appendChild(image);
  })

   element.appendChild(fragment);
   photo.remove();
};

var addFeatures = function(ad, element) {
  var featuresList = element.querySelector('.popup__features');
  var fragment = document.createDocumentFragment();

  while (featuresList.firstChild) {
    featuresList.removeChild(featuresList.firstChild);
  }

  ad.offer.features.forEach(function(it) {
    var li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + it)
    fragment.appendChild(li)
  })

  featuresList.appendChild(fragment);
};

var renderCard = function(ad) {
  var card = document.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);

  if (card) {
    window.utils.closePopup(card);
  }

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__type').textContent = types[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  addPhotos(ad, cardElement);
  addFeatures(ad, cardElement)

  window.map.element.appendChild(cardElement);

  var cardCloseButton = cardElement.querySelector('.popup__close');

  window.utils.closingPopup(cardElement,cardCloseButton);
};

window.card = {
  render: renderCard
};

})();
