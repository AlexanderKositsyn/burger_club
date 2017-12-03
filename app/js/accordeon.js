export default function accordeonInit(
  classAccordeonItem,
  classAccordeonActiveItem
) {
  return function accordeonIt(e) {
    e.preventDefault();
    var $this = this,
      accordeonItems = $this.children,
      target = e.target,
      accordeonItem = target.closest(classAccordeonItem);

    // имеет или нет кликнутый элемент активный класс?
    if (accordeonItem.classList.contains(classAccordeonActiveItem)) {
      //если имеет то скрыть
      accordeonItem.classList.remove(classAccordeonActiveItem);
    } else {
      //если не имеет то есть два варианта
      //1) если есть у друго элемента, то найти его и скрыть;
      //2) если нет ни у кого то просто откыть кликнутый;
      // и там и там открываем кликнутый
      if ($this.querySelector(`.${classAccordeonActiveItem}`)) {
        $this
          .querySelector(`.${classAccordeonActiveItem}`)
          .classList.remove(classAccordeonActiveItem);
      }
      accordeonItem.classList.add(classAccordeonActiveItem);
    }
  };
}
