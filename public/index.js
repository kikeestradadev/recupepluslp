/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var mainMenuInstances = new WeakMap();
var mainMenuId = 0;
var mainMenu = function mainMenu() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  /** @type {Array<() => void>} */
  var initialized = [];
  var roots = scope.querySelectorAll('[data-main-menu], .main-menu');
  if (roots.length > 0) {
    roots.forEach(function (root) {
      if (mainMenuInstances.has(root)) return;
      var toggle = root.querySelector('[data-main-menu-toggle], .main-menu__hamburger');
      var panel = root.querySelector('[data-main-menu-panel], .main-menu__panel');
      var languageToggle = root.querySelector('[data-main-menu-language], .main-menu__language');
      var dropdownItems = Array.from(root.querySelectorAll('.main-menu__item--has-children'));
      var desktopQuery = window.matchMedia('(min-width: 1280px)');
      var controller = new AbortController();
      var signal = controller.signal;
      var instanceId = ++mainMenuId;
      if (toggle && panel) {
        if (!panel.id) panel.id = "main-menu-panel-".concat(instanceId);
        toggle.setAttribute('aria-controls', panel.id);
      }
      dropdownItems.forEach(function (item, index) {
        var trigger = item.querySelector('[data-main-menu-submenu-toggle], .main-menu__link');
        var submenu = item.querySelector('[data-main-menu-submenu], .main-menu__sub-menu');
        if (!trigger || !submenu) return;
        if (!submenu.id) submenu.id = "main-menu-submenu-".concat(instanceId, "-").concat(index + 1);
        trigger.setAttribute('aria-controls', submenu.id);
        trigger.setAttribute('aria-expanded', 'false');
      });
      var setMenuOpen = function setMenuOpen(open) {
        var restoreFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        root.classList.toggle('main-menu--open', open);
        if (toggle) {
          toggle.setAttribute('aria-expanded', String(open));
          toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        }
        if (panel) panel.setAttribute('aria-hidden', String(!desktopQuery.matches && !open));
        if (open && panel) {
          var _panel$querySelector;
          (_panel$querySelector = panel.querySelector('.main-menu__link')) === null || _panel$querySelector === void 0 || _panel$querySelector.focus();
        } else if (restoreFocus) {
          toggle === null || toggle === void 0 || toggle.focus();
        }
      };
      var setDropdownOpen = function setDropdownOpen(item, open) {
        item.classList.toggle('main-menu__item--open', open);
        var trigger = item.querySelector('[data-main-menu-submenu-toggle], .main-menu__link');
        if (trigger) trigger.setAttribute('aria-expanded', String(open));
      };
      var closeDropdowns = function closeDropdowns() {
        var except = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        dropdownItems.forEach(function (item) {
          if (item !== except) setDropdownOpen(item, false);
        });
      };
      var onToggle = function onToggle() {
        setMenuOpen(!root.classList.contains('main-menu--open'));
      };
      var onDocumentClick = function onDocumentClick(event) {
        if (!root.contains(event.target)) {
          setMenuOpen(false);
          closeDropdowns();
        }
      };
      var onKeydown = function onKeydown(event) {
        if (event.key !== 'Escape') return;
        var wasOpen = root.classList.contains('main-menu--open');
        var focusedDropdown = dropdownItems.find(function (item) {
          return item.contains(document.activeElement);
        });
        setMenuOpen(false, wasOpen);
        closeDropdowns();
        if (!wasOpen && focusedDropdown) {
          var _focusedDropdown$quer;
          (_focusedDropdown$quer = focusedDropdown.querySelector('[data-main-menu-submenu-toggle], .main-menu__link')) === null || _focusedDropdown$quer === void 0 || _focusedDropdown$quer.focus();
        }
      };
      var onViewportChange = function onViewportChange() {
        setMenuOpen(false);
        closeDropdowns();
        if (panel) panel.setAttribute('aria-hidden', String(!desktopQuery.matches));
      };
      var syncLanguageToggle = function syncLanguageToggle(locale) {
        if (!languageToggle) return;
        var nextLocale = locale === 'es' ? 'en' : 'es';
        var nextLabel = languageToggle.getAttribute("data-".concat(nextLocale, "-label")) || (nextLocale === 'en' ? 'English' : 'Español');
        languageToggle.setAttribute('data-locale', locale);
        languageToggle.setAttribute('aria-label', "Cambiar a ".concat(nextLabel));
        languageToggle.querySelectorAll('.main-menu__language-flag, [data-flag]').forEach(function (flag) {
          flag.hidden = flag.getAttribute('data-flag') !== locale;
        });
      };
      var onLanguageToggle = function onLanguageToggle() {
        if (!languageToggle) return;
        var currentLocale = languageToggle.getAttribute('data-locale') || 'es';
        var nextLocale = currentLocale === 'es' ? 'en' : 'es';
        var nextHref = languageToggle.getAttribute("data-".concat(nextLocale, "-href"));
        syncLanguageToggle(nextLocale);
        if (nextHref && nextHref !== '#') {
          window.location.href = nextHref;
        }
      };
      toggle === null || toggle === void 0 || toggle.addEventListener('click', onToggle, {
        signal: signal
      });
      languageToggle === null || languageToggle === void 0 || languageToggle.addEventListener('click', onLanguageToggle, {
        signal: signal
      });
      dropdownItems.forEach(function (item) {
        var trigger = item.querySelector('[data-main-menu-submenu-toggle], .main-menu__link');
        if (!trigger) return;
        trigger.addEventListener('click', function (event) {
          if (desktopQuery.matches) return;
          event.preventDefault();
          var willOpen = !item.classList.contains('main-menu__item--open');
          closeDropdowns(item);
          setDropdownOpen(item, willOpen);
        }, {
          signal: signal
        });
        item.addEventListener('mouseenter', function () {
          if (desktopQuery.matches) setDropdownOpen(item, true);
        }, {
          signal: signal
        });
        item.addEventListener('mouseleave', function () {
          if (desktopQuery.matches) setDropdownOpen(item, false);
        }, {
          signal: signal
        });
        item.addEventListener('focusin', function () {
          if (desktopQuery.matches) setDropdownOpen(item, true);
        }, {
          signal: signal
        });
        item.addEventListener('focusout', function (event) {
          if (desktopQuery.matches && !item.contains(event.relatedTarget)) {
            setDropdownOpen(item, false);
          }
        }, {
          signal: signal
        });
      });
      document.addEventListener('click', onDocumentClick, {
        signal: signal
      });
      document.addEventListener('keydown', onKeydown, {
        signal: signal
      });
      if (typeof desktopQuery.addEventListener === 'function') {
        desktopQuery.addEventListener('change', onViewportChange, {
          signal: signal
        });
      } else {
        desktopQuery.addListener(onViewportChange);
      }
      onViewportChange();
      var destroy = function destroy() {
        controller.abort();
        if (typeof desktopQuery.removeEventListener !== 'function') {
          desktopQuery.removeListener(onViewportChange);
        }
        setMenuOpen(false);
        closeDropdowns();
        toggle === null || toggle === void 0 || toggle.removeAttribute('aria-controls');
        panel === null || panel === void 0 || panel.removeAttribute('aria-hidden');
        mainMenuInstances.delete(root);
      };
      mainMenuInstances.set(root, destroy);
      initialized.push(destroy);
    });
  }
  return function () {
    return initialized.forEach(function (destroy) {
      return destroy();
    });
  };
};
/* harmony default export */ __webpack_exports__["default"] = (mainMenu);

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var momentSlider = function momentSlider() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('.moment-slider');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      var swiperEl = root.querySelector('.moment-slider__swiper');
      if (!swiperEl) return;
      if (swiperEl.swiper) {
        instances.push(swiperEl.swiper);
        return;
      }
      var prevEl = root.querySelector('.moment-slider__nav--prev');
      var nextEl = root.querySelector('.moment-slider__nav--next');
      var paginationEl = root.querySelector('.moment-slider__pagination');
      var instance = new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 16,
        grabCursor: true,
        freeMode: true,
        pagination: {
          el: paginationEl,
          clickable: true
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        },
        breakpoints: {
          640: {
            spaceBetween: 20
          },
          960: {
            spaceBetween: 24
          }
        }
      });
      instances.push(instance);
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (momentSlider);

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var productSlider = function productSlider() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('.product-slider');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      root.querySelectorAll('.product-slider__slider').forEach(function (group) {
        var swiperEl = group.querySelector('.product-slider__swiper');
        if (!swiperEl) return;
        if (swiperEl.swiper) {
          instances.push(swiperEl.swiper);
          return;
        }
        var prevEl = group.querySelector('.product-slider__nav--prev');
        var nextEl = group.querySelector('.product-slider__nav--next');
        var paginationEl = group.querySelector('.product-slider__pagination');
        var instance = new Swiper(swiperEl, {
          slidesPerView: 'auto',
          loop: false,
          spaceBetween: 12,
          grabCursor: true,
          freeMode: true,
          pagination: {
            el: paginationEl,
            clickable: true
          },
          navigation: {
            prevEl: prevEl,
            nextEl: nextEl
          },
          breakpoints: {
            640: {
              spaceBetween: 16
            },
            960: {
              spaceBetween: 20
            }
          }
        });
        instances.push(instance);
      });
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (productSlider);

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var alliesSlider = function alliesSlider() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('.allies-slider');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      var swiperEl = root.querySelector('.allies-slider__swiper');
      if (!swiperEl) return;
      if (swiperEl.swiper) {
        instances.push(swiperEl.swiper);
        return;
      }
      var paginationEl = root.querySelector('.allies-slider__pagination');
      var instance = new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: 12,
        grabCursor: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        pagination: {
          el: paginationEl,
          clickable: true
        },
        breakpoints: {
          640: {
            spaceBetween: 16
          },
          960: {
            spaceBetween: 20
          }
        }
      });
      instances.push(instance);
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (alliesSlider);

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var storeLocatorInstances = new WeakMap();
var storeLocator = function storeLocator() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  /** @type {Array<() => void>} */
  var initialized = [];
  var roots = scope.querySelectorAll('[data-store-locator], .store-locator');
  if (roots.length > 0) {
    roots.forEach(function (root) {
      if (storeLocatorInstances.has(root)) return;
      var items = Array.from(root.querySelectorAll('.store-locator__item[data-store]'));
      var pins = Array.from(root.querySelectorAll('.store-locator__pin[data-store]'));
      var form = root.querySelector('[data-store-locator-search], .store-locator__search');
      var input = form === null || form === void 0 ? void 0 : form.querySelector('.store-locator__input');
      var status = root.querySelector('[data-store-locator-status]');
      var controller = new AbortController();
      var signal = controller.signal;

      /** @param {string | undefined} storeId */
      var setActive = function setActive(storeId) {
        items.forEach(function (item) {
          var _item$querySelector;
          var active = item.getAttribute('data-store') === storeId;
          item.classList.toggle('store-locator__item--active', active);
          (_item$querySelector = item.querySelector('.store-locator__item-btn')) === null || _item$querySelector === void 0 || _item$querySelector.setAttribute('aria-pressed', String(active));
        });
        pins.forEach(function (pin) {
          pin.classList.toggle('store-locator__pin--active', pin.getAttribute('data-store') === storeId);
        });
      };
      items.forEach(function (item) {
        var button = item.querySelector('.store-locator__item-btn');
        if (!button) return;
        button.addEventListener('click', function () {
          return setActive(item.getAttribute('data-store') || undefined);
        }, {
          signal: signal
        });
      });
      form === null || form === void 0 || form.addEventListener('submit', function (event) {
        event.preventDefault();
        var query = (input === null || input === void 0 ? void 0 : input.value.trim().toLocaleLowerCase('es')) || '';
        var matches = items.filter(function (item) {
          return !query || item.textContent.toLocaleLowerCase('es').includes(query);
        });
        items.forEach(function (item) {
          item.hidden = !matches.includes(item);
        });
        var firstMatch = matches[0];
        setActive((firstMatch === null || firstMatch === void 0 ? void 0 : firstMatch.getAttribute('data-store')) || undefined);
        if (status) {
          status.textContent = matches.length === 1 ? 'Se encontró una tienda.' : "Se encontraron ".concat(matches.length, " tiendas.");
        }
      }, {
        signal: signal
      });
      var initialItem = items.find(function (item) {
        return item.classList.contains('store-locator__item--active');
      }) || items[0];
      if (initialItem) setActive(initialItem.getAttribute('data-store') || undefined);
      var destroy = function destroy() {
        controller.abort();
        storeLocatorInstances.delete(root);
      };
      storeLocatorInstances.set(root, destroy);
      initialized.push(destroy);
    });
  }
  return function () {
    return initialized.forEach(function (destroy) {
      return destroy();
    });
  };
};
/* harmony default export */ __webpack_exports__["default"] = (storeLocator);

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var waysSlider = function waysSlider() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('.ways-slider');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      var swiperEl = root.querySelector('.ways-slider__swiper');
      if (!swiperEl) return;
      if (swiperEl.swiper) {
        instances.push(swiperEl.swiper);
        return;
      }
      var prevEl = root.querySelector('.ways-slider__nav--prev');
      var nextEl = root.querySelector('.ways-slider__nav--next');
      var paginationEl = root.querySelector('.ways-slider__pagination');
      var instance = new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 16,
        grabCursor: true,
        pagination: {
          el: paginationEl,
          clickable: true
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        },
        breakpoints: {
          640: {
            spaceBetween: 20
          },
          960: {
            spaceBetween: 24
          }
        }
      });
      instances.push(instance);
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (waysSlider);

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var believeCards = function believeCards() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('.believe-cards');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      var swiperEl = root.querySelector('.believe-cards__swiper');
      if (!swiperEl) return;
      if (swiperEl.swiper) {
        instances.push(swiperEl.swiper);
        return;
      }
      var prevEl = root.querySelector('.believe-cards__nav--prev');
      var nextEl = root.querySelector('.believe-cards__nav--next');
      var paginationEl = root.querySelector('.believe-cards__pagination');
      var instance = new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 16,
        grabCursor: true,
        watchOverflow: true,
        pagination: {
          el: paginationEl,
          clickable: true
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        },
        breakpoints: {
          640: {
            spaceBetween: 20
          },
          960: {
            spaceBetween: 24
          }
        }
      });
      instances.push(instance);
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (believeCards);

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var reviewsSlider = function reviewsSlider() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('.reviews-slider');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      var swiperEl = root.querySelector('.reviews-slider__swiper');
      if (!swiperEl) return;
      if (swiperEl.swiper) {
        instances.push(swiperEl.swiper);
        return;
      }
      var prevEl = root.querySelector('.reviews-slider__nav--prev');
      var nextEl = root.querySelector('.reviews-slider__nav--next');
      var paginationEl = root.querySelector('.reviews-slider__pagination');
      var instance = new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 16,
        grabCursor: true,
        pagination: {
          el: paginationEl,
          clickable: true
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        },
        breakpoints: {
          640: {
            spaceBetween: 20
          },
          960: {
            spaceBetween: 24
          }
        }
      });
      instances.push(instance);
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (reviewsSlider);

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var guideSlider = function guideSlider() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('.guide-slider');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      var swiperEl = root.querySelector('.guide-slider__swiper');
      if (!swiperEl) return;
      if (swiperEl.swiper) {
        instances.push(swiperEl.swiper);
        return;
      }
      var prevEl = root.querySelector('.guide-slider__nav--prev');
      var nextEl = root.querySelector('.guide-slider__nav--next');
      var paginationEl = root.querySelector('.guide-slider__pagination');
      var instance = new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 12,
        grabCursor: true,
        pagination: {
          el: paginationEl,
          clickable: true
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        },
        breakpoints: {
          640: {
            spaceBetween: 16
          },
          960: {
            spaceBetween: 20
          }
        }
      });
      instances.push(instance);
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (guideSlider);

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var ingredientsSlider = function ingredientsSlider() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('.ingredients-slider');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      var swiperEl = root.querySelector('.ingredients-slider__swiper');
      if (!swiperEl) return;
      if (swiperEl.swiper) {
        instances.push(swiperEl.swiper);
        return;
      }
      var prevEl = root.querySelector('.ingredients-slider__nav--prev');
      var nextEl = root.querySelector('.ingredients-slider__nav--next');
      var paginationEl = root.querySelector('.ingredients-slider__pagination');
      var instance = new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 16,
        grabCursor: true,
        watchOverflow: true,
        pagination: {
          el: paginationEl,
          clickable: true
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        },
        breakpoints: {
          640: {
            spaceBetween: 20
          },
          960: {
            spaceBetween: 24
          }
        }
      });
      instances.push(instance);
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (ingredientsSlider);

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var blogSlider = function blogSlider() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('.blog-slider');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      var swiperEl = root.querySelector('.blog-slider__swiper');
      if (!swiperEl) return;
      if (swiperEl.swiper) {
        instances.push(swiperEl.swiper);
        return;
      }
      var prevEl = root.querySelector('.blog-slider__nav--prev');
      var nextEl = root.querySelector('.blog-slider__nav--next');
      var paginationEl = root.querySelector('.blog-slider__pagination');
      var instance = new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 16,
        grabCursor: true,
        pagination: {
          el: paginationEl,
          clickable: true
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        },
        breakpoints: {
          640: {
            spaceBetween: 20
          },
          960: {
            spaceBetween: 24
          }
        }
      });
      instances.push(instance);
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (blogSlider);

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var blogFilterInstances = new WeakMap();
var blogFilter = function blogFilter() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  /** @type {Array<() => void>} */
  var initialized = [];
  var roots = scope.querySelectorAll('[data-blog-filter], .blog-filter');
  if (roots.length > 0) {
    roots.forEach(function (root) {
      var _chips$find;
      if (blogFilterInstances.has(root)) return;
      var requestedPerPage = Number(root.dataset.perPage);
      var perPage = Number.isFinite(requestedPerPage) && requestedPerPage > 0 ? Math.floor(requestedPerPage) : 6;
      var chips = Array.from(root.querySelectorAll('.blog-filter__chip[data-filter]'));
      var gridCards = Array.from(root.querySelectorAll('[data-blog-grid] .blog-filter__card'));
      var mobileTrack = root.querySelector('[data-blog-mobile-track]');
      var mobileSlides = Array.from(root.querySelectorAll('[data-blog-mobile-track] .blog-filter__slide'));
      var paginationEl = root.querySelector('[data-blog-pagination]');
      var filtersSwiperEl = root.querySelector('.blog-filter__filters-swiper');
      var filtersPrev = root.querySelector('.blog-filter__filters-nav--prev');
      var filtersNext = root.querySelector('.blog-filter__filters-nav--next');
      var postsSwiperEl = root.querySelector('[data-blog-swiper]');
      var bulletsEl = root.querySelector('.blog-filter__bullets');
      var desktopQuery = window.matchMedia('(min-width: 960px)');
      var controller = new AbortController();
      var signal = controller.signal;
      var activeFilter = ((_chips$find = chips.find(function (chip) {
        return chip.classList.contains('blog-filter__chip--active');
      })) === null || _chips$find === void 0 ? void 0 : _chips$find.dataset.filter) || 'all';
      var currentPage = 1;
      var filtersSwiper = null;
      var postsSwiper = null;
      var getFiltered = function getFiltered(items) {
        return items.filter(function (item) {
          return activeFilter === 'all' || item.dataset.category === activeFilter;
        });
      };
      var setChipState = function setChipState() {
        chips.forEach(function (chip) {
          var active = chip.dataset.filter === activeFilter;
          chip.classList.toggle('blog-filter__chip--active', active);
          chip.setAttribute('aria-pressed', String(active));
        });
      };
      var renderPagination = function renderPagination(totalPages) {
        if (!paginationEl) return;
        paginationEl.innerHTML = '';
        if (totalPages <= 1) return;
        var addButton = function addButton(label, page) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var button = document.createElement('button');
          button.type = 'button';
          button.className = "blog-filter__page".concat(options.active ? ' blog-filter__page--active' : '').concat(options.nav ? ' blog-filter__page--nav' : '');
          button.textContent = label;
          button.disabled = Boolean(options.disabled || options.active);
          if (options.label) button.setAttribute('aria-label', options.label);
          if (options.active) button.setAttribute('aria-current', 'page');
          if (!options.active && !options.disabled) {
            button.addEventListener('click', function () {
              currentPage = page;
              updateBaseView();
            });
          }
          paginationEl.appendChild(button);
        };
        addButton('‹', Math.max(1, currentPage - 1), {
          nav: true,
          disabled: currentPage === 1,
          label: 'Página anterior'
        });
        for (var page = 1; page <= totalPages; page += 1) {
          addButton(String(page), page, {
            active: page === currentPage,
            label: "P\xE1gina ".concat(page)
          });
        }
        addButton('›', Math.min(totalPages, currentPage + 1), {
          nav: true,
          disabled: currentPage === totalPages,
          label: 'Página siguiente'
        });
      };
      var updateDesktopGrid = function updateDesktopGrid() {
        var filtered = getFiltered(gridCards);
        var totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
        if (currentPage > totalPages) currentPage = totalPages;
        var start = (currentPage - 1) * perPage;
        var visibleCards = new Set(filtered.slice(start, start + perPage));
        gridCards.forEach(function (card) {
          card.hidden = !visibleCards.has(card);
        });
        renderPagination(totalPages);
      };
      var updateMobileItems = function updateMobileItems() {
        mobileSlides.forEach(function (slide) {
          slide.hidden = !getFiltered([slide]).length;
        });
      };
      var updateBaseView = function updateBaseView() {
        setChipState();
        updateDesktopGrid();
        updateMobileItems();
      };
      var destroyPostsSwiper = function destroyPostsSwiper() {
        if (!postsSwiper) return;
        postsSwiper.destroy(true, true);
        postsSwiper = null;
      };
      var destroyFiltersSwiper = function destroyFiltersSwiper() {
        if (!filtersSwiper) return;
        filtersSwiper.destroy(true, true);
        filtersSwiper = null;
      };
      var enhanceMobilePosts = function enhanceMobilePosts() {
        if (typeof Swiper === 'undefined' || !postsSwiperEl || !mobileTrack) return;
        destroyPostsSwiper();
        var filtered = getFiltered(mobileSlides);
        mobileTrack.innerHTML = '';
        filtered.forEach(function (slide) {
          slide.hidden = false;
          mobileTrack.appendChild(slide);
        });
        if (!filtered.length) return;
        try {
          postsSwiper = new Swiper(postsSwiperEl, {
            slidesPerView: 'auto',
            loop: false,
            spaceBetween: 16,
            grabCursor: true,
            watchOverflow: true,
            pagination: {
              el: bulletsEl,
              clickable: true
            },
            breakpoints: {
              640: {
                spaceBetween: 20
              }
            }
          });
        } catch (error) {
          postsSwiper = null;
        }
      };
      var enhanceMobileFilters = function enhanceMobileFilters() {
        if (typeof Swiper === 'undefined' || !filtersSwiperEl || filtersSwiper) return;
        try {
          filtersSwiper = new Swiper(filtersSwiperEl, {
            slidesPerView: 'auto',
            loop: false,
            spaceBetween: 10,
            freeMode: true,
            grabCursor: true,
            watchOverflow: true,
            navigation: {
              prevEl: filtersPrev,
              nextEl: filtersNext
            }
          });
        } catch (error) {
          filtersSwiper = null;
        }
      };
      var updateEnhancements = function updateEnhancements() {
        if (desktopQuery.matches) {
          destroyPostsSwiper();
          destroyFiltersSwiper();
          return;
        }
        enhanceMobileFilters();
        enhanceMobilePosts();
      };
      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          activeFilter = chip.dataset.filter || 'all';
          currentPage = 1;
          updateBaseView();
          if (!desktopQuery.matches) enhanceMobilePosts();
        }, {
          signal: signal
        });
      });
      var onViewportChange = function onViewportChange() {
        updateBaseView();
        updateEnhancements();
      };
      if (typeof desktopQuery.addEventListener === 'function') {
        desktopQuery.addEventListener('change', onViewportChange, {
          signal: signal
        });
      } else {
        desktopQuery.addListener(onViewportChange);
      }
      updateBaseView();
      updateEnhancements();
      var destroy = function destroy() {
        controller.abort();
        if (typeof desktopQuery.removeEventListener !== 'function') {
          desktopQuery.removeListener(onViewportChange);
        }
        destroyPostsSwiper();
        destroyFiltersSwiper();
        if (mobileTrack) {
          mobileTrack.innerHTML = '';
          mobileSlides.forEach(function (slide) {
            slide.hidden = false;
            mobileTrack.appendChild(slide);
          });
        }
        blogFilterInstances.delete(root);
      };
      blogFilterInstances.set(root, destroy);
      initialized.push(destroy);
    });
  }
  return function () {
    return initialized.forEach(function (destroy) {
      return destroy();
    });
  };
};
/* harmony default export */ __webpack_exports__["default"] = (blogFilter);

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var mainSlider = function mainSlider() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('[data-main-slider], .main-slider');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      var swiperEl = root.querySelector('.main-slider__swiper');
      if (!swiperEl) return;
      if (swiperEl.swiper) {
        instances.push(swiperEl.swiper);
        return;
      }
      var prevEl = root.querySelector('.main-slider__nav--prev');
      var nextEl = root.querySelector('.main-slider__nav--next');
      var paginationEl = root.querySelector('.main-slider__pagination');
      var autoplayToggle = root.querySelector('[data-main-slider-autoplay]');
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var instance = new Swiper(swiperEl, {
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        speed: prefersReducedMotion ? 0 : 900,
        loop: true,
        grabCursor: true,
        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
        autoplay: prefersReducedMotion ? false : {
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        pagination: {
          el: paginationEl,
          clickable: true
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        },
        a11y: {
          enabled: true,
          prevSlideMessage: 'Diapositiva anterior',
          nextSlideMessage: 'Diapositiva siguiente',
          firstSlideMessage: 'Esta es la primera diapositiva',
          lastSlideMessage: 'Esta es la última diapositiva',
          paginationBulletMessage: 'Ir a la diapositiva {{index}}'
        },
        on: {
          init: function init() {
            return root.classList.add('main-slider--ready');
          }
        }
      });
      if (autoplayToggle) {
        if (prefersReducedMotion || !instance.autoplay) {
          autoplayToggle.hidden = true;
        } else {
          var isPaused = false;
          var label = autoplayToggle.querySelector('.main-slider__autoplay-label');
          var icon = autoplayToggle.querySelector('.main-slider__autoplay-icon');
          var updateAutoplayControl = function updateAutoplayControl() {
            autoplayToggle.setAttribute('aria-pressed', String(isPaused));
            autoplayToggle.setAttribute('aria-label', isPaused ? 'Reanudar reproducción automática' : 'Pausar reproducción automática');
            if (label) label.textContent = isPaused ? 'Reanudar' : 'Pausar';
            if (icon) icon.textContent = isPaused ? '▶' : 'Ⅱ';
          };
          autoplayToggle.addEventListener('click', function () {
            isPaused = !isPaused;
            if (isPaused) {
              instance.autoplay.stop();
            } else {
              instance.autoplay.start();
            }
            updateAutoplayControl();
          });
          updateAutoplayControl();
        }
      }
      instances.push(instance);
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (mainSlider);

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var mainBanner = function mainBanner() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var instances = [];
  var roots = scope.querySelectorAll('.main-banner');
  if (roots.length > 0 && typeof Swiper !== 'undefined') {
    roots.forEach(function (root) {
      var swiperEl = root.querySelector('.main-banner__swiper');
      if (!swiperEl) return;
      if (swiperEl.swiper) {
        instances.push(swiperEl.swiper);
        return;
      }
      var prevEl = root.querySelector('.main-banner__nav--prev');
      var nextEl = root.querySelector('.main-banner__nav--next');
      var paginationEl = root.querySelector('.main-banner__pagination');
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var instance = new Swiper(swiperEl, {
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        speed: prefersReducedMotion ? 0 : 900,
        loop: true,
        grabCursor: true,
        autoplay: prefersReducedMotion ? false : {
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        pagination: {
          el: paginationEl,
          clickable: true
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        }
      });
      instances.push(instance);
    });
  }
  return instances;
};
/* harmony default export */ __webpack_exports__["default"] = (mainBanner);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_mainMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_momentSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _modules_productSlider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _modules_alliesSlider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _modules_storeLocator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _modules_waysSlider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _modules_believeCards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _modules_reviewsSlider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8);
/* harmony import */ var _modules_guideSlider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);
/* harmony import */ var _modules_ingredientsSlider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(10);
/* harmony import */ var _modules_blogSlider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11);
/* harmony import */ var _modules_blogFilter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(12);
/* harmony import */ var _modules_mainSlider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(13);
/* harmony import */ var _modules_mainBanner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(14);














var initComponents = function initComponents() {
  (0,_modules_mainMenu__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_mainSlider__WEBPACK_IMPORTED_MODULE_12__["default"])();
  (0,_modules_mainBanner__WEBPACK_IMPORTED_MODULE_13__["default"])();
  (0,_modules_momentSlider__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_productSlider__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_alliesSlider__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_storeLocator__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_waysSlider__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_believeCards__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_reviewsSlider__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_modules_guideSlider__WEBPACK_IMPORTED_MODULE_8__["default"])();
  (0,_modules_ingredientsSlider__WEBPACK_IMPORTED_MODULE_9__["default"])();
  (0,_modules_blogSlider__WEBPACK_IMPORTED_MODULE_10__["default"])();
  (0,_modules_blogFilter__WEBPACK_IMPORTED_MODULE_11__["default"])();
  if (typeof window.Prism !== 'undefined' && document.querySelector('code[class*="language-"], [class*="language-"] code')) {
    window.Prism.highlightAll();
  }
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents, {
    once: true
  });
} else {
  initComponents();
}
}();
/******/ })()
;
//# sourceMappingURL=index.js.map