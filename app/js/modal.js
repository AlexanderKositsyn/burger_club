/**
 * Открывает модальное окно исходя из переданных параметров.
 * @param {string} modalName - Query селектор модалки, зависит от секции.
 * @param {string} modalTitle - Текст тайтла модалки.
 * @param {string} modalText - Текст тела модалки.
 */

export default function modalOpen(modalName, modalTitle, modalText) {
  modalName = document.querySelector(modalName);
  //отображаем модалку
  modalName.style.display = "block";
  //добавляем текст в модалку
  modalName.querySelector(".modal__title").innerHTML = modalTitle;
  modalName.querySelector(".modal__text").innerHTML = modalText;
  //после открытия модалки для закрытия  ее вешаем обработчик на секцию
  let isDisplay = e => {
    if (modalName.style.display === "block") {
      modalName.style.display = "none";
      modalName.closest(".section").removeEventListener("click", isDisplay);
    }
  };
  modalName.closest(".section").addEventListener("click", isDisplay);
  //обработчик на крестик закрытия
  modalName.querySelector(".modal__exit").addEventListener("click", () => {
    modalName.style.display = "none";
  });
}
