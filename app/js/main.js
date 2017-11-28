"use strict";
/**
 * Создает новый объект для onepagescroll
 * @param {Object} options - объект, который описывает все параметры onepagescroll.
 * @param {string} options.querySelectorWrapper - query селектор враппера, который должен строять на месте.
 * @param {string} options.queryOPSList - query селектор списка, который будет двигаться абсолютом.
 * @param {string} options.queryOPSItems - query селектор итемов списка.
 * @param {number} options.OPScurrnetItem - начальная позиция слайдера.
 * @param {number} options.querySelectorPagination - query селектор списка пагинации (или любого другого индикатора).
 * @param {number} options.querySelectorPaginationItem - query селектор точек(итемов) пагинации (или любого другого индикатора).
 */

function OnePageScroll(options = {}) {
  //св ва для onepagescroll как для слайдера
  this.wrapper = document.querySelector(options.querySelectorWrapper);
  this.OPSList = this.wrapper.querySelector(options.queryOPSList);
  this.OPSItems = this.wrapper.querySelectorAll(options.queryOPSItems);
  this.OPScurrnetItem = options.OPScurrnetItem || 0;

  // св ва для пагинации(точки сбоку)
  this.pagination = document.querySelector(options.querySelectorPagination);
  this.paginationItems = this.wrapper.querySelectorAll(
    options.querySelectorPaginationItem
  );

  //метод иницализации слайдера
  this.init = () => {
    //проверка что оболочка для onepagescroll есть
    if (this.wrapper) {
      if (md.mobile()) {
        document.addEventListener("touchstart", this.mobileListener);
        document.addEventListener("touchend", this.mobileListener);
        document.addEventListener("touchmove", this.mobileListener);
      } else {
        this.wrapper.addEventListener("wheel", this.pcListener);
        document.addEventListener("keydown", this.pcListener);
        document.addEventListener("touchmove", this.pcListener);
        document.addEventListener("click", this.pcListener);
      }
    }
  };

  // метод возвращающий новый индекс в зависимотсти от произошедшего события
  this.nextItem = item => {
    if (this.objEvent.target.getAttribute("data-scroll-to")) {
      item = +this.objEvent.target.getAttribute("data-scroll-to");
    }
    if (
      this.objEvent.deltaY > 0 ||
      this.objEvent.keyCode == 40 ||
      this.direction == "down"
    ) {
      this.objEvent.preventDefault();
      item != this.OPSItems.length - 1 ? (item = item + 1) : void 0;
    }
    if (
      this.objEvent.deltaY < 0 ||
      this.objEvent.keyCode == 38 ||
      this.direction == "up"
    ) {
      this.objEvent.preventDefault();
      item != 0 ? (item = item - 1) : void 0;
    }
    return item;
  };

  // функция которая перемещает слайды в зависимоти от index
  this.moveTo = index => {
    this.OPSList.style.top = -index * 100 + "%";
  };

  // функция изменения активного класса на секциях слайдера
  this.changeSectionActiveClasses = sectionActiveClass => {
    this.wrapper
      .querySelector(`.${sectionActiveClass}`)
      .classList.remove(sectionActiveClass);
    this.OPSItems[this.OPScurrnetItem].classList.add(sectionActiveClass);
  };

  // функция изменения активного класса на пагинации
  this.changePaginationActiveClasses = paginationActiveClass => {
    this.pagination
      .querySelector(`.${paginationActiveClass}`)
      .classList.remove(paginationActiveClass);
    this.paginationItems[this.OPScurrnetItem].classList.add(
      paginationActiveClass
    );
  };

  // обработчик для мобильника
  this.mobileListener = e => {
    //записываю в объект  - объект события, чтобы другие фукнции могли его тоже взять из объекта
    this.objEvent = e;

    // сначала сохраняем значение первого тыка
    if (this.objEvent.type == "touchstart") {
      this.ts = this.objEvent.touches["0"].clientY;
    }
    // потом сохраняем второго и тут же сравниваем и делаем смещение onepagescroll
    if (this.objEvent.type == "touchend") {
      this.te = this.objEvent.changedTouches["0"].clientY;

      // условие чтобы при малейшем свайпе не листался ops
      // deltaOPS определяет порог через который свой будет произведен
      this.deltaOPS = 200;
      if (Math.abs(this.ts - this.te) > this.deltaOPS) {
        this.ts > this.te ? (this.direction = "down") : (this.direction = "up");
      } else {
        this.direction = void 0;
      }

      //строка вызывающас функция, которая изменяющет переменную текущего слайда  (для мобилок: сравниваем со старым и делаем перемещение)
      this.OPScurrnetItem = this.nextItem(this.OPScurrnetItem);

      // изменяем активный класс на секции
      this.changeSectionActiveClasses("section--active");

      // изменяем активный класс на пагинации
      this.changePaginationActiveClasses("pagination__item--active");

      // вызов функции которая премещает список с section
      this.moveTo(this.OPScurrnetItem);
    }
  };

  // обработчик на слайдер для pc
  this.pcListener = e => {
    // записываю в объект - таргет события, чтобы другие функции в объекте могли его взять из объкта
    this.target = e.target;
    //записываю в объект  - объект события, чтобы другие фукнции могли его тоже взять из объекта
    this.objEvent = e;
    //переменная чтобы не потерять контекст вызова функции в setTimeout
    let $this = this;

    //строка вызывающас функция, которая изменяющет переменную текущего слайда  (для мобилок: сравниваем со старым и делаем перемещение)
    this.OPScurrnetItem = this.nextItem(this.OPScurrnetItem);

    // изменяем активный класс на секции
    this.changeSectionActiveClasses("section--active");

    // изменяем активный класс на пагинации
    this.changePaginationActiveClasses("pagination__item--active");

    //убираем активные классы с выпадающего меню (если клик был по нему)
    if (this.target.classList.contains("hamburger-menu__link")) {
      document
        .querySelector(".hamburger-menu--active")
        .classList.remove("hamburger-menu--active");
      document
        .querySelector(".hamburger--active")
        .classList.remove("hamburger--active");
      document.querySelector(".logo--active").classList.remove("logo--active");
      document
        .querySelector(".pagination--active")
        .classList.remove("pagination--active");
      //класс чтобы не было скролла
      document
        .querySelector(".maincontent")
        .classList.remove("maincontent--active-menu");
    }

    // вызов функции которая премещает список с section
    this.moveTo(this.OPScurrnetItem);

    // удаляем обработчик с через время ставим его опять,
    // для того чтобы событие не срабатывало много раз при прокрутке мышкой или тачпадом
    this.wrapper.removeEventListener("wheel", this.pcListener);
    setTimeout(function() {
      $this.wrapper.addEventListener("wheel", $this.pcListener);
    }, 1000);
    // функция убирает ops
    this.remove = () => {
      if (this.wrapper) {
        if (md.mobile()) {
          document.removeEventListener("touchstart", this.mobileListener);
          document.removeEventListener("touchend", this.mobileListener);
          document.removeEventListener("touchmove", this.mobileListener);
        } else {
          this.wrapper.removeEventListener("wheel", this.pcListener);
          document.removeEventListener("keydown", this.pcListener);
          document.removeEventListener("touchmove", this.pcListener);
          document.removeEventListener("click", this.pcListener);
        }
      }
    };
  };
}

(function() {
  ymaps.ready(init);

  function init() {
    let myMap = new ymaps.Map("map", {
      center: [59.92835943, 30.32644111],
      zoom: 12,
      controls: []
    });
    let marker = "/img/map-marker.png";

    myMap.behaviors.disable("scrollZoom");

    let coords = [
        [59.95415993442389, 30.412447935989327],
        [59.9444854, 30.38450602],
        [59.88751101, 30.32545451],
        [59.90993322, 30.49436931]
      ],
      myCollection = new ymaps.GeoObjectCollection(
        {},
        {
          iconLayout: "default#image",
          iconImageHref: marker,
          iconImageSize: [46, 57],
          iconImageOffset: [-24, -54]
        }
      );

    for (var i = 0; i < coords.length; i++) {
      myCollection.add(new ymaps.Placemark(coords[i]));
    }

    myMap.geoObjects.add(myCollection);
  }
})();

// проверка с какого браузера сидит пользователь
var md = new MobileDetect(window.navigator.userAgent);
