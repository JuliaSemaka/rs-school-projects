const headerBurger = document.getElementById("header-burger");
const headerLinks = document.getElementById("header-links");
const donateNow = document.getElementById("donate-now");
const formDonate = document.getElementById("form-donate");
const cover = document.getElementById("cover");
const donateCross = document.getElementById("donate-cross");
const formMakeYourDonation = document.getElementById("form-make-your-donation");
const formMakeYourDonationStep2 = document.getElementById(
  "form-make-your-donation-step2"
);
const formMakeYourDonationStep3 = document.getElementById(
  "form-make-your-donation-step3"
);
const donationSubmit = document.getElementById("donation-submit");
const donationSelect = document.getElementById("donation-select");
const donationMonthSelect = document.getElementById("donation-month-select");
const donationYearSelect = document.getElementById("donation-year-select");
const donationOptions = document.getElementById("donation-options");
const donationMonthOptions = document.getElementById("donation-month-options");
const donationYearOptions = document.getElementById("donation-year-options");
const checkedDonateSum = document.getElementById("checked-donate-sum");
const step1Next = document.getElementById("step1_next");
const step2Next = document.getElementById("step2_next");
const step3Next = document.getElementById("step3_next");
const step2Back = document.getElementById("step2_back");
const step3Back = document.getElementById("step3_back");
const donationAmountMainPage = document.getElementById(
  "donation-amount-main-page"
);
const otherAmount = document.getElementById("other-amount");
const sumAmount = document.getElementById("sum-amount");
const specialPet = document.getElementById("special-pet");
const dataCardNumber = document.getElementById("data-card-number");
const billingInformation = document.getElementById("billing-information");
const body = document.querySelector("body");

const fillMonth = () => {
  for (let i = 1; i <= 12; i++) {
    donationMonthOptions.insertAdjacentHTML(
      "beforeend",
      `<div class="text popup-donation__special-pet_options-item">${
        i < 10 ? "0" + i : i
      }</div>`
    );
  }
};

const fillYear = () => {
  let today = new Date();
  let year = today.getFullYear();
  for (let i = 0; i <= 5; i++) {
    donationYearOptions.insertAdjacentHTML(
      "beforeend",
      `<div class="text popup-donation__special-pet_options-item">${
        year + i
      }</div>`
    );
  }
};

fillMonth();
fillYear();

const toggleCover = () => {
  cover.classList.toggle("hidden");
  body.classList.toggle("lock");
};

const donate = () => {
  formDonate.classList.toggle("hidden");
  toggleCover();
};

const donation = () => {
  formMakeYourDonation.classList.toggle("hidden");
  toggleCover();
};

const coverClick = () => {
  formDonate.classList.add("hidden");
  formMakeYourDonation.classList.add("hidden");
  formMakeYourDonationStep2.classList.add("hidden");
  formMakeYourDonationStep3.classList.add("hidden");
  toggleCover();
};

const cleanAmount = () => {
  otherAmount
    .querySelector(".popup-donation__other_button")
    .classList.remove("popup-donation_active");
  sumAmount
    .querySelectorAll(".popup-donation__main_item")
    .forEach((item) => item.classList.remove("popup-donation_active"));
};

const optionsToggle = () => {
  donationOptions.classList.toggle("hidden");
};

const fillFieldCard = () => {
  let isFillAllField = true;
  dataCardNumber
    .querySelectorAll(".popup-donation__main_input")
    .forEach((item) => {
      if (item.value === "") {
        isFillAllField = false;
      }
    });
  billingInformation
    .querySelectorAll(".popup-donation__main_input")
    .forEach((item) => {
      if (item.value === "") {
        isFillAllField = false;
      }
    });
  if (
    otherAmount
      .querySelector(".popup-donation__other_button")
      .classList.contains("popup-donation_active") &&
    otherAmount.querySelector(".popup-donation__other_input").value === ""
  ) {
    isFillAllField = false;
  }
  if (donationMonthSelect.querySelector("span").innerText === "Month") {
    isFillAllField = false;
  }
  if (donationYearSelect.querySelector("span").innerText === "Year") {
    isFillAllField = false;
  }
  if (
    donationSelect.querySelector("span").innerText === "Choose your favourite"
  ) {
    isFillAllField = false;
  }
  if (isFillAllField) {
    step3Next.disabled = false;
  }
};

headerBurger.addEventListener("click", () => {
  headerBurger.classList.toggle("header-burger_active");
  headerLinks.classList.toggle("header-links_active");
});

donateNow.addEventListener("click", () => {
  donate();
});

cover.addEventListener("click", () => {
  coverClick();
});

donateCross.addEventListener("click", () => {
  donate();
});

donationSelect.addEventListener("click", () => {
  optionsToggle();
});

donationMonthSelect.addEventListener("click", () => {
  donationMonthOptions.classList.toggle("hidden");
});

donationYearSelect.addEventListener("click", () => {
  donationYearOptions.classList.toggle("hidden");
});

donationOptions.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup-donation__special-pet_options-item")
  ) {
    donationSelect.querySelector("span").innerText = event.target.innerText;
    specialPet.classList.add("popup-donation_active");
    donationSelect.classList.remove("text_notactive");
    optionsToggle();
    fillFieldCard();
  }
});

donationMonthOptions.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup-donation__special-pet_options-item")
  ) {
    donationMonthSelect.querySelector("span").innerText =
      event.target.innerText;
    donationMonthSelect.classList.remove("text_notactive");
    donationMonthOptions.classList.toggle("hidden");
    fillFieldCard();
  }
});

donationYearOptions.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup-donation__special-pet_options-item")
  ) {
    donationYearSelect.querySelector("span").innerText = event.target.innerText;
    donationYearSelect.classList.remove("text_notactive");
    donationYearOptions.classList.toggle("hidden");
    fillFieldCard();
  }
});

checkedDonateSum.addEventListener("click", (event) => {
  let elem;
  if (event.target.classList.contains("text_button")) {
    elem = event.target.parentElement;
  }
  if (event.target.classList.contains("popup-donate__form_item")) {
    elem = event.target;
  }
  if (elem) {
    cleanAmount();
    let sum = elem.getAttribute("data-sum");
    if (sum === "other") {
      otherAmount.querySelector("input[type=number]").value = "";
      otherAmount
        .querySelector(".popup-donation__other_button")
        .classList.add("popup-donation_active");
    } else {
      sumAmount
        .querySelector(`button[data-sum="${sum}"]`)
        .classList.add("popup-donation_active");
      otherAmount.querySelector(".popup-donation__other_input").value = "";
    }
    formDonate.classList.toggle("hidden");
    formMakeYourDonation.classList.toggle("hidden");
  }
});

donationSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  donation();
  cleanAmount();
  if (donationAmountMainPage.value) {
    otherAmount.querySelector("input[type=number]").value =
      donationAmountMainPage.value;
    otherAmount
      .querySelector(".popup-donation__other_button")
      .classList.add("popup-donation_active");
  } else {
    sumAmount
      .querySelector("button[data-sum='10']")
      .classList.add("popup-donation_active");
  }
});

sumAmount.addEventListener("click", (event) => {
  let elem;
  if (event.target.classList.contains("text_button")) {
    elem = event.target.parentElement;
  }
  if (event.target.classList.contains("popup-donation__main_item")) {
    elem = event.target;
  }
  if (elem) {
    cleanAmount();
    elem.classList.add("popup-donation_active");
  }
});

otherAmount.addEventListener("click", (event) => {
  let elem;
  if (event.target.classList.contains("text_button")) {
    elem = event.target.parentElement;
  }
  if (event.target.classList.contains("popup-donation__other_button")) {
    elem = event.target;
  }
  if (elem) {
    cleanAmount();
    elem.classList.add("popup-donation_active");
  }
});

otherAmount.addEventListener("input", (event) => {
  if (event.target.classList.contains("popup-donation__other_input")) {
    elem = event.target.parentElement.querySelector(
      ".popup-donation__other_button"
    );
  }
  if (elem) {
    cleanAmount();
    elem.classList.add("popup-donation_active");
    fillFieldCard();
  }
});

const donationsToggle = () => {
  formMakeYourDonation.classList.toggle("hidden");
  formMakeYourDonationStep2.classList.toggle("hidden");
};

const donations2Toggle = () => {
  formMakeYourDonationStep2.classList.toggle("hidden");
  formMakeYourDonationStep3.classList.toggle("hidden");
};

step1Next.addEventListener("click", () => {
  donationsToggle();
});

step2Next.addEventListener("click", () => {
  donations2Toggle();
});

step3Next.addEventListener("click", () => {
  toggleCover();
  formMakeYourDonationStep3.classList.toggle("hidden");
  setTimeout("alert('Thank you for your donation')", 100);
});

step2Back.addEventListener("click", () => {
  donationsToggle();
});

step3Back.addEventListener("click", () => {
  donations2Toggle();
});

dataCardNumber.querySelectorAll(".popup-donation__main_input").forEach((item) =>
  item.addEventListener("input", () => {
    fillFieldCard();
  })
);

billingInformation
  .querySelectorAll(".popup-donation__main_input")
  .forEach((item) =>
    item.addEventListener("input", () => {
      fillFieldCard();
    })
  );
