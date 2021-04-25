window.onload = function () {
  const FULLSCREEN = document.querySelector(".fullscreen");
  const FILTERS = document.querySelector(".filters");
  console.log("FILTERS: ", FILTERS);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const chengeStyles = (name, value, sizing) => {
    let root = document.querySelector(":root");
    root.style.setProperty(`--${name}`, value + sizing);
    let rootStyles = getComputedStyle(root);
    let mainColor = rootStyles.getPropertyValue(`--${name}`);
  };

  const inputRange = (event) => {
    let e = event.target;
    let outputElem = e.parentElement.querySelector("output");
    outputElem.value = e.value;
    chengeStyles(e.name, e.value, e.getAttribute("data-sizing"));
  };

  FULLSCREEN.addEventListener("click", toggleFullScreen);
  FILTERS.addEventListener("input", inputRange);
};
