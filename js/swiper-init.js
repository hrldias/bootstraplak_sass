const swiper = new Swiper('.swiper', {
  // Optional parameters

  slidesPerView: 1.15,
  spaceBetween: 6,
  centeredSlides: true,
  loop: true,
  //autoplay: { delay: 2300 },
  breakpoints: {
    768: { 
      slidesPerView: 1.5,
      spaceBetween: 18, 
    },

    1024: { 
      slidesPerView: 3,
      spaceBetween: 18, 
    },
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  
});