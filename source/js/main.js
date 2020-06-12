'use strict';

(function () {

  var headerElement = document.querySelector('.header');
  var toggleBtnElement = headerElement.querySelector('.header__toggle-btn');

  toggleBtnElement.classList.remove('header__toggle-btn--nojs');

})();

(function () {

  var footerElement = document.querySelector('.footer');
  var acordionBtnsElements = footerElement.querySelectorAll('.accordion__title');
  var acordionContentsElements = footerElement.querySelectorAll('.accordion__content');

  activeAcardion();

  function activeAcardion() {
    Array.prototype.slice.call(acordionBtnsElements).forEach(function (acordionBtn) {
      acordionBtn.classList.add('accordion__title--js');
      acordionBtn.setAttribute('tabIndex', 0);
    });

    Array.prototype.slice.call(acordionContentsElements).forEach(function (acordionContent) {
      acordionContent.classList.add('accordion__content--js');
    });
  }

  Array.prototype.slice.call(acordionBtnsElements).forEach(function (acordionBtn, i) {
    acordionBtn.addEventListener('click', function () {
      var contentSelector = '.accordion__content:eq(' + i + ')';

      if (acordionContentsElements[i].classList.contains('accordion__content--active')) {
        $(contentSelector).fadeOut('slow');
      } else {
        $(contentSelector).fadeIn('slow');
      }

      acordionContentsElements[i].classList.toggle('accordion__content--active');
      acordionBtn.classList.toggle('accordion__title--active');
    });
  });

})();

(function () {

  objectFitImages();

})();
