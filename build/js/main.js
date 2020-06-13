'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 300;

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();

(function () {

  var headerElement = document.querySelector('.header');
  var toggleBtnElement = headerElement.querySelector('.header__toggle-btn');

  toggleBtnElement.classList.remove('header__toggle-btn--nojs');

})();

(function () {
  var bodyElement = document.body;
  var headerElement = document.querySelector('.header');
  var formsElements = document.querySelectorAll('.form');
  var nameFieldsElements = document.querySelectorAll('input[name="user-name"]');
  var phoneFieldsElements = document.querySelectorAll('input[type="tel"]');
  var formsList = Array.prototype.slice.call(formsElements);
  var nameFieldsList = Array.prototype.slice.call(nameFieldsElements);
  var phoneFieldsList = Array.prototype.slice.call(phoneFieldsElements);
  var PHONE_FOCUS_VALUE = '+7(';
  var PHONE_MIN_VALUE = 3;

  var isStorageSupport = true;
  var storageName;
  var storagePhone;

  try {
    storageName = localStorage.getItem('userName');
  } catch (err) {
    isStorageSupport = false;
  }

  try {
    storagePhone = localStorage.getItem('userPhone');
  } catch (err) {
    isStorageSupport = false;
  }

  $('input[type="tel"]').mask('+7(000)000-0000');

  formsList.forEach(function (form) {
    form.addEventListener('submit', function (evt) {
      var nameFieldElement = form.querySelector('input[name="user-name"]');
      var phoneFieldElement = form.querySelector('input[type="tel"]');

      if (isStorageSupport) {
        localStorage.setItem('userName', nameFieldElement.value);
        localStorage.setItem('userPhone', phoneFieldElement.value);
      }
    });
  });

  nameFieldsList.forEach(function (nameField) {
    if (storageName) {
      nameField.value = storageName;
    }
  });

  phoneFieldsList.forEach(function (phoneField) {
    if (storagePhone) {
      phoneField.value = storagePhone;
    }

    phoneField.addEventListener('focus', function () {
      if (!phoneField.value) {
        phoneField.value = PHONE_FOCUS_VALUE;
      }
    })

    phoneField.addEventListener('blur', function () {
      if (phoneField.value.length === PHONE_MIN_VALUE) {
        phoneField.value = '';
      }
    })

    phoneField.addEventListener('input', function () {
      if (phoneField.value.length < PHONE_MIN_VALUE) {
        phoneField.value = PHONE_FOCUS_VALUE;
      }
    })
  });

  function scrollbarWidth() {
    var documentWidth = parseInt(document.documentElement.clientWidth);
    var windowsWidth = parseInt(window.innerWidth);
    var scrollbarWidth = windowsWidth - documentWidth;
    return scrollbarWidth;
  }

  function hideScroll() {
    bodyElement.style.marginRight = scrollbarWidth() + 'px';
    headerElement.style.marginRight = scrollbarWidth() + 'px';
    bodyElement.style.overflow = 'hidden'
  }

  function showScroll() {
    bodyElement.style.overflow = '';
    bodyElement.style.marginRight = 0;
    headerElement.style.marginRight = 0;
  }

  $('.header__btn').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    closeBtnInside: true,
    mainClass: 'popup-form--zoom',
    callbacks: {
      beforeOpen: function () {
        hideScroll();
      },
      close: function () {
        showScroll();
      }
    }
  });

})();

(function () {

  var footerElement = document.querySelector('.footer');
  var accordionBtnsElements = footerElement.querySelectorAll('.accordion__title');
  var accordionContentsElements = footerElement.querySelectorAll('.accordion__content');
  var accordionContentsList = Array.prototype.slice.call(accordionContentsElements);
  var accordionBtnsList = Array.prototype.slice.call(accordionBtnsElements);
  var MAX_MOBILE_WIDTH = 767;

  activeAccordion();
  checkWidth();

  function activeAccordion() {
    accordionBtnsList.forEach(function (accordionBtn) {
      accordionBtn.classList.add('accordion__title--js');
    });

    accordionContentsList.forEach(function (accordionContent) {
      accordionContent.classList.add('accordion__content--js');
    });
  }

  window.addEventListener('resize', window.debounce(function () {
    checkWidth();
  }));

  function checkWidth() {
    if (document.documentElement.clientWidth <= MAX_MOBILE_WIDTH) {
      onAccordion();
    } else {
      offAccordion();
    }
  }

  function onAccordion() {
    hideAllContent();

    accordionBtnsList.forEach(function (accordionBtn) {
      accordionBtn.setAttribute('tabIndex', 0);
    });

    addAccordionBtnClick();
  }

  function offAccordion() {
    showAllContent();

    accordionBtnsList.forEach(function (accordionBtn) {
      accordionBtn.setAttribute('tabIndex', '');
    });

    removeAccordionBtnClick();
  }

  function showAllContent() {
    accordionBtnsList.forEach(function (accordionBtn) {
      if (!accordionBtn.classList.contains('accordion__title--active')) {
        accordionBtn.classList.add('accordion__title--active');
      }
    });

    accordionContentsList.forEach(function (accordionContent) {
      if (!accordionContent.classList.contains('accordion__content--active')) {
        accordionContent.classList.add('accordion__content--active');
        accordionContent.setAttribute('style', '');
      }
    });
  }

  function hideAllContent() {
    accordionBtnsList.forEach(function (accordionBtn) {
      if (accordionBtn.classList.contains('accordion__title--active')) {
        accordionBtn.classList.remove('accordion__title--active');
      }
    });

    accordionContentsList.forEach(function (accordionContent) {
      if (accordionContent.classList.contains('accordion__content--active')) {
        accordionContent.classList.remove('accordion__content--active');
        accordionContent.setAttribute('style', '');
      }
    });
  }

  function onAccordionBtnClick() {
    var i = accordionBtnsList.indexOf(this);
    var contentSelector = '.accordion__content:eq(' + i + ')';

    if (accordionContentsElements[i].classList.contains('accordion__content--active')) {
      $(contentSelector).fadeOut();
    } else {
      $(contentSelector).fadeIn();
    }

    accordionContentsElements[i].classList.toggle('accordion__content--active');
    this.classList.toggle('accordion__title--active');
  }

  function addAccordionBtnClick() {
    accordionBtnsList.forEach(function (accordionBtn) {
      accordionBtn.addEventListener('click', onAccordionBtnClick);
    });
  }

  function removeAccordionBtnClick() {
    accordionBtnsList.forEach(function (accordionBtn) {
      accordionBtn.removeEventListener('click', onAccordionBtnClick);
    });
  }

})();

(function () {

  objectFitImages();

})();
