// принимает фукнцию которая открывает модальное окно
export default function feedsInit(modalOpen) {
  // иницализуруем у каждого объекта dotdotdot с параметрами
  $(".feeds__desc").each((index, item) => {
    $(item).dotdotdot({
      keep: ".feeds__more-info"
    });
  });

  (function() {
    let feeds_section = document.querySelector(".feeds-section");
    let feeds__text, feeds__title;
    //модалка для отзывов
    if (feeds_section) {
      // обработчик на всю секцию если нажали на кнопку
      feeds_section.addEventListener("click", e => {
        e.preventDefault();
        let target = e.target;
        //обработчик на кнопку "подробнее"
        if (target.classList.contains("feeds__more-info")) {
          // находим для кликнутого элемента его api у dotdotdot
          let dotdotdotApi = $(target)
            .siblings(".feeds__desc")
            .data("dotdotdot");
          // разворачиваем весь текст чтобы его скопировать (	When truncated, restore )
          dotdotdotApi.restore();
          // формируем текст для модалки
          feeds__text = target
            .closest(".feeds__hided")
            .querySelector(".feeds__desc").textContent;
          feeds__title = target
            .closest(".feeds__hided")
            .querySelector(".feeds__title").textContent;
          // вызываем функцию модалку
          modalOpen(".modal__feeds", feeds__title, feeds__text);
          // Сворачивам обратно текст чтобы он стал с  тремя точками  (Not truncated, truncate)
          dotdotdotApi.truncate();
          // даем плагину команду чтобы следил за изменением монитора и либо увеличивал, либо уменьшал слова в блоке
          dotdotdotApi.watch();
        }
      });
    }
  })();
}
