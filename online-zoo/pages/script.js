const headerBurger = document.getElementById("header-burger");
const headerLinks = document.getElementById("header-links");
const donateNow = document.getElementById("donate-now");
const formDonate = document.getElementById("form-donate");
const cover = document.getElementById("cover");
const donateCross = document.getElementById("donate-cross");
const donationSelect = document.getElementById("donation-select");
const donationOptions = document.getElementById("donation-options");
const body = document.querySelector("body");

const donate = () => {
  formDonate.classList.toggle("hidden");
  cover.classList.toggle("hidden");
  body.classList.toggle("lock");
};

headerBurger.addEventListener("click", () => {
  headerBurger.classList.toggle("header-burger_active");
  headerLinks.classList.toggle("header-links_active");
});

donateNow.addEventListener("click", () => {
  donate();
});

cover.addEventListener("click", () => {
  donate();
});

donateCross.addEventListener("click", () => {
  donate();
});

donationSelect.addEventListener("click", () => {
  donationOptions.classList.toggle("hidden");
  donationSelect.classList.toggle("text_notactive");
});

donationOptions.addEventListener("click", (event) => {
  if (
    event.target.className ===
    "text popup-donation__special-pet_options-item"
  ) {
    donationSelect.querySelector("span").innerText = event.target.innerText;
    donationOptions.classList.toggle("hidden");
    donationSelect.classList.toggle("text_notactive");
  }
});
