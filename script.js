document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider2");
    const sliderInner = document.querySelector(".slider-inner2");
    const progressBar = document.querySelector(".progress-bar2");
    const slides = document.querySelectorAll(".slide-img2");
  
    if (!slides.length) return;
  
    const slideWidth = slides[0].clientWidth + 30; // includes margin-right
    const totalSlides = slides.length;
    const maxTranslateX = -((totalSlides - 1) * slideWidth);
  
    let currentIndex = 0;
    let isPressDown = false;
    let cursorXSpace;
  
    function moveToIndex(index) {
      currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
      const newLeft = -currentIndex * slideWidth;
      sliderInner.style.transition = "transform 0.5s ease";
      sliderInner.style.transform = `translateX(${Math.max(newLeft, maxTranslateX)}px)`;
      const percentage = (currentIndex / (totalSlides - 1)) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  
    slider.addEventListener("mousedown", (e) => {
      isPressDown = true;
      cursorXSpace = e.clientX - sliderInner.getBoundingClientRect().left;
      slider.style.cursor = "grabbing";
    });
  
    window.addEventListener("mouseup", () => {
      isPressDown = false;
      slider.style.cursor = "grab";
    });
  
    slider.addEventListener("mousemove", (e) => {
      if (!isPressDown) return;
      e.preventDefault();
      let newLeft = e.clientX - cursorXSpace - slider.getBoundingClientRect().left;
      const minLeft = slider.clientWidth - sliderInner.scrollWidth;
      newLeft = Math.max(newLeft, minLeft);
      newLeft = Math.min(newLeft, 0);
  
      sliderInner.style.transition = "none";
      sliderInner.style.transform = `translateX(${newLeft}px)`;
  
      const scrollWidth = sliderInner.scrollWidth;
      const percentage = (Math.abs(newLeft) / (scrollWidth - slider.clientWidth)) * 100;
      progressBar.style.width = `${percentage}%`;
    });
  
    const prevArrow = document.querySelector(".main-slider-prev2");
    const nextArrow = document.querySelector(".main-slider-next2");
  
    prevArrow.addEventListener("click", () => {
      if (currentIndex > 0) {
        moveToIndex(currentIndex - 1);
      }
    });
  
    nextArrow.addEventListener("click", () => {
      if (currentIndex < totalSlides - 1) {
        moveToIndex(currentIndex + 1);
      }
    });
  
    // Initial positioning
    moveToIndex(0);
  });
  