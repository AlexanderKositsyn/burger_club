export default function hamburgerMenu() {
  var hamMenu = document.querySelector(".hamburger");
  if (hamMenu) {
    hamMenu.addEventListener("click", function(e) {
      e.preventDefault();
      document
        .querySelector(".hamburger-menu")
        .classList.toggle("hamburger-menu--active");
      document.querySelector(".logo").classList.toggle("logo--active");
      document
        .querySelector(".hamburger")
        .classList.toggle("hamburger--active");
      document
        .querySelector(".pagination")
        .classList.toggle("pagination--active");
      document.querySelector("body").classList.toggle("body--active");
      //класс чтобы не было скролла
      document
        .querySelector(".maincontent")
        .classList.toggle("maincontent--active-menu");
    });
  }
}
