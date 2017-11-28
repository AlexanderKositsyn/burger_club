(function() {
  let menu = document.getElementById("menu");

  if (menu) {
    menu.addEventListener(
      "click",
      accordeonInit(".menu__item", "menu__item--active")
    );
  }
})();
