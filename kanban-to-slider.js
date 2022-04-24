document.addEventListener("DOMContentLoaded", function () {
  const kanban = document.querySelector(".kanban");
  const kanbanWrapper = kanban.querySelector(".kanban__inner");
  const columns = kanbanWrapper.querySelectorAll(".column");
  let swiper = null;

  if (window.innerWidth <= 550) {
    addSwiperClasses();
    initSwiperOnMobile();
    console.log("fired on load");
  }

  window.addEventListener(
    "resize",
    function () {
      const isMobile = window.innerWidth <= 550;
      if (isMobile && swiper == null) {
        addSwiperClasses();
        initSwiperOnMobile();
        console.log("fired on resize <= 550");
      } else if (!isMobile && swiper !== null) {
        removeSwiperClasses();
        console.log("fired on resize >= 550");
        swiper.destroy();
        //как передать инфу об объекте свайпера? Параметром?
        swiper = null;
      }
    },
    true
  );

  function addSwiperClasses() {
    kanban.classList.add("swiper");
    kanbanWrapper.classList.add("swiper-wrapper");
    for (const column of columns) {
      column.classList.add("swiper-slide");
    }
  }

  function removeSwiperClasses() {
    kanban.classList.remove("swiper");
    kanbanWrapper.classList.remove("swiper-wrapper");
    for (const column of columns) {
      column.classList.remove("swiper-slide");
    }
  }

  function initSwiperOnMobile() {
    if (swiper == null) {
      swiper = new Swiper(".swiper", {
        speed: 400,
        spaceBetween: 20,
        slidesPerView: "auto",
        slidesOffsetBefore: 20,
      });
    }
  }
});
