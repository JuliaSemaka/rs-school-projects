window.onload = function () {
  const FULLSCREEN = document.querySelector(".fullscreen");
  const FILTERS = document.querySelector(".filters");
  const RESET = document.querySelector(".btn-reset");
  const NEXT = document.querySelector(".btn-next");
  const IMAGE = document.querySelector(".editor img");
  const LOAD = document.querySelector(".btn-load--input");
  const SAVE = document.querySelector(".btn-save");
  const ELEMENTS = document.querySelectorAll('input[type="range"]');
  let imageNum = 0;

  const cleanLoad = () => {
    LOAD.value = "";
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const changeStyles = (name, value, sizing) => {
    let root = document.querySelector(":root");
    root.style.setProperty(`--${name}`, value + sizing);

    // let rootStyles = getComputedStyle(root);
    // rootStyles.getPropertyValue(`--${name}`);
  };

  const changeOutput = (elem) => {
    let outputElem = elem.parentElement.querySelector("output");
    outputElem.value = elem.value;
  };

  const inputRange = (event) => {
    let e = event.target;
    if (!e.matches('input[type="range"]')) {
      return;
    }
    changeOutput(e);
    changeStyles(e.name, e.value, e.getAttribute("data-sizing"));
  };

  const resetFilter = () => {
    ELEMENTS.forEach((elem) => {
      elem.value = elem.getAttribute("data-default");
      changeOutput(elem);
      changeStyles(
        elem.name,
        elem.getAttribute("data-default"),
        elem.getAttribute("data-sizing")
      );
    });
  };

  const getHour = () => {
    let now = new Date();
    let hour = now.getHours();
    if (hour >= 0 && hour < 6) {
      return "night/";
    } else if (hour < 12) {
      return "morning/";
    } else if (hour < 18) {
      return "day/";
    } else {
      return "evening/";
    }
  };

  const viewBgImage = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      IMAGE.src = src;
    };
  };

  const nextImage = () => {
    cleanLoad();
    const base =
      "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
    const images = [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "05.jpg",
      "06.jpg",
      "07.jpg",
      "08.jpg",
      "09.jpg",
      "10.jpg",
      "11.jpg",
      "12.jpg",
      "13.jpg",
      "14.jpg",
      "15.jpg",
      "16.jpg",
      "17.jpg",
      "18.jpg",
      "19.jpg",
      "20.jpg",
    ];

    const timesOfDay = getHour();

    const index = imageNum % images.length;
    const imageSrc = base + timesOfDay + images[index];
    viewBgImage(imageSrc);
    imageNum++;
  };

  const loadImage = () => {
    const file = LOAD.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      IMAGE.src = reader.result;
    };
    if (file) reader.readAsDataURL(file);
  };

  const setFilter = (height) => {
    console.log(height, IMAGE.height);
    let str = "";
    ELEMENTS.forEach((elem) => {
      str += `${elem.name === "hue" ? "hue-rotate" : elem.name}(${
        elem.name === "blur" ? elem.value * (height / IMAGE.height) : elem.value
      }${elem.getAttribute("data-sizing")}) `;
    });
    console.log(str);
    return str.trim();
  };

  const saveImage = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = IMAGE.src;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.filter = setFilter(img.height);
      ctx.strokeRect(50, 50, 50, 50);
      ctx.drawImage(img, 0, 0);
      let link = document.createElement("a");
      link.download = "download.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      link.delete;
    };
  };

  FULLSCREEN.addEventListener("click", toggleFullScreen);
  FILTERS.addEventListener("input", inputRange);
  RESET.addEventListener("click", resetFilter);
  NEXT.addEventListener("click", nextImage);
  LOAD.addEventListener("change", loadImage);
  SAVE.addEventListener("click", saveImage);
};
