const buttonUndraw = document.getElementById("button-undraw");
const sidebar = document.getElementById("sidebar");
const videoChoiceList = document.getElementById("video-choice-list");
const zoosVideo = document.getElementById("zoos-video");
const left = document.getElementById("left");
const right = document.getElementById("right");
const videoChoiceContent = document.getElementById("video-choice-content");
const sidebarAnimals = document.getElementById("sidebar-animals");
const undrawBottom = document.getElementById("undraw-bottom");

buttonUndraw.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar_active");
});

videoChoiceList.addEventListener("click", (event) => {
  let video = event.target.parentElement.firstElementChild;
  let videoBig = zoosVideo.firstElementChild;
  zoosVideo.firstElementChild.remove();
  zoosVideo.insertAdjacentHTML("afterbegin", video.outerHTML);
  zoosVideo.firstElementChild.width = 1400;
  zoosVideo.firstElementChild.height = 787;
  event.target.parentElement.firstElementChild.remove();
  event.target.parentElement.insertAdjacentHTML(
    "afterbegin",
    videoBig.outerHTML
  );
  event.target.parentElement.firstElementChild.width = 320;
  event.target.parentElement.firstElementChild.height = 209;
});

const gap = 40;
let slideIndex = 0;
let imgWidth = document.querySelector(".video-choice__item").offsetWidth;
window.addEventListener("resize", (e) => {
  imgWidth = document.querySelector(".video-choice__item").offsetWidth;
});

right.addEventListener("click", () => {
  if (slideIndex >= 6) {
    slideIndex = 0;
  }
  slideIndex++;
  videoChoiceList.scrollTo((imgWidth + gap) * slideIndex, 0);
});

left.addEventListener("click", () => {
  if (slideIndex <= 0) {
    slideIndex = 6;
  }
  slideIndex--;
  videoChoiceList.scrollTo((imgWidth + gap) * slideIndex, 0);
});

undrawBottom.addEventListener("click", () => {
  undrawBottom.insertAdjacentHTML(
    "beforebegin",
    sidebarAnimals.firstElementChild.outerHTML
  );
  sidebarAnimals.firstElementChild.remove();
});
