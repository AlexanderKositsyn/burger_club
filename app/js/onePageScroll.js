// создание нового объекта от конструктора OnaPageScroll
let OPS = new OnePageScroll({
  querySelectorWrapper: ".wrapper",
  queryOPSList: ".maincontent",
  queryOPSItems: ".section",
  OPScurrnetItem: 0,
  querySelectorPagination: ".pagination",
  querySelectorPaginationItem: ".pagination__item"
});

// иницилизация его (в нее входит проверка наличия элементов на странице, а также установка обработчика на document)
OPS.init();
