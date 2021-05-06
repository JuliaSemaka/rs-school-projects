const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const meetPetsSlider = document.getElementById("meet-pets-slider");
const reviews = document.getElementById("reviews");
const reviewsLeft = document.getElementById("reviews-left");
const reviewsRight = document.getElementById("reviews-right");

const gap = 40;
let slideIndex = 0;
let imgWidth = document.querySelector(".slider-item").offsetWidth;
window.addEventListener("resize", (e) => {
  imgWidth = document.querySelector(".slider-item").offsetWidth;
});

arrowRight.addEventListener("click", () => {
  slideIndex += 2;
  if (slideIndex >= 13) {
    slideIndex = 0;
  }
  meetPetsSlider.style.marginLeft = `-${(imgWidth + gap) * slideIndex}px`;
});

arrowLeft.addEventListener("click", () => {
  slideIndex -= 2;
  if (slideIndex < 0) {
    slideIndex = 12;
  }
  meetPetsSlider.style.marginLeft = `-${(imgWidth + gap) * slideIndex}px`;
});

const reviewsGap = 30;
let reviewsSlideIndex = 0;
let reviewsImgWidth = document.querySelector(".review").offsetWidth;
window.addEventListener("resize", (e) => {
  reviewsImgWidth = document.querySelector(".review").offsetWidth;
});

const slideFunc = () => {
  reviewsSlideIndex += 2;
  if (reviewsSlideIndex >= 5) {
    reviewsSlideIndex = 0;
  }
  reviews
    .querySelectorAll(".reviews__line")
    .forEach(
      (item) =>
        (item.style.marginLeft = `-${
          (reviewsImgWidth + reviewsGap) * reviewsSlideIndex
        }px`)
    );
};

const delayAutoSliding = () => {
  clearTimeout(autoSlideTimeout);
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;

  autoSlideTimeout = setTimeout(() => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(slideFunc, 15000);
  }, 45000);
};

reviewsLeft.addEventListener("click", () => {
  reviewsSlideIndex -= 2;
  if (reviewsSlideIndex < 0) {
    reviewsSlideIndex = 4;
  }
  reviews
    .querySelectorAll(".reviews__line")
    .forEach(
      (item) =>
        (item.style.marginLeft = `-${
          (reviewsImgWidth + reviewsGap) * reviewsSlideIndex
        }px`)
    );
  delayAutoSliding();
});

reviewsRight.addEventListener("click", () => {
  slideFunc();
  delayAutoSliding();
});

let autoSlideInterval = setInterval(slideFunc, 15000);
let autoSlideTimeout = null;

reviews.addEventListener("click", delayAutoSliding);
