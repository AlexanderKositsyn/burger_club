export default function sliderInit(md) {
  let slider = document.querySelector(".slider"),
    currnetItem = 0;

  let sliderListener = e => {
    let $this = this,
      sliderWrap = slider.querySelector(".slider__wrap"),
      sliderList = slider.querySelector(".slider__list"),
      sliderItems = slider.querySelectorAll(".slider__item"),
      target = e.target;

    function nextCurrentItem(currnetItem) {
      if (
        target.classList.contains("slider__right-button") ||
        target.classList.contains("slider__right-arrow")
      ) {
        currnetItem != sliderItems.length - 1
          ? currnetItem++
          : (currnetItem = 0);
      }

      if (
        target.classList.contains("slider__left-button") ||
        target.classList.contains("slider__left-arrow")
      ) {
        currnetItem != 0
          ? currnetItem--
          : (currnetItem = sliderItems.length - 1);
      }

      return currnetItem;
    }

    currnetItem = nextCurrentItem(currnetItem);

    sliderWrap
      .querySelector(".slider__item--active")
      .classList.remove("slider__item--active");
    sliderItems[currnetItem].classList.add("slider__item--active");
    sliderList.style.transform = `translateX(${-currnetItem * 100 + "%"})`;
  };

  if (slider) {
    if (md.mobile()) {
      slider.addEventListener("touchstart", sliderListener);
    } else {
      slider.addEventListener("click", sliderListener);
    }
  }
}
