/**
 * Import anime.js library
 * @module anime
 */
import anime from "/node_modules/animejs/lib/anime.es.js";
/**
 * Get the trigger button, box, and button wrapper elements from the DOM
 */
const button = document.getElementById("trigger-button"),
  box = document.getElementById("box"),
  menuOverlay = document.getElementById("menu-overlay"),
  buttonWrapper = document.getElementById("buttonWrapper");

/**
 * Create an animation using anime.js
 * The animation targets the box element and scales it based on the size of the window.
 */
const tl = anime.timeline({
  easing: "easeInOutExpo",
  duration: 750,
  autoplay: false,
});

tl.add({
  targets: box,
  scale: () => {
    const boxWidth = box.getBoundingClientRect().width,
      boxHeight = box.getBoundingClientRect().height;
    const windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;

    const biggerWrapperValue = Math.max(...[boxWidth, boxHeight]);
    const biggerWindowValue = Math.max(...[windowWidth, windowHeight]);

    const scalefactor = (biggerWindowValue / biggerWrapperValue) * 2.5;
    return scalefactor;
  },
  easing: "easeInOutExpo",
  duration: 1100,
  autoplay: false,
}).add(
  {
    targets: ".menuLink",
    translateY: ["0", "-=1em"], // Move up
    opacity: {
      value: 1,
      duration: 1250,
    },
    delay: anime.stagger(100),
  },
  "-=650"
);

let buttonState = "initclose";
let timeoutId;

button.addEventListener("click", () => {
  // if the button is clicked for the first time to open the menu. this condition is necessary because of animation direction needs to be forward for the first time and can't use reverse at the first click.
  switch (buttonState) {
    case "initclose":
      buttonState = "open";
      // to make the wrapper fill the screen and stop overflow.
      buttonWrapper.style.width = "100vw";
      buttonWrapper.style.height = "100vh";
      buttonWrapper.style.overflow = "hidden";
      menuOverlay.style.display = "unset";
      tl.play();
      clearTimeout(timeoutId);
      break;
    // to open the menu after first time.
    case "close":
      buttonState = "open";
      // to make the wrapper fill the screen and stop overflow.
      buttonWrapper.style.width = "100vw";
      buttonWrapper.style.height = "100vh";
      buttonWrapper.style.overflow = "hidden";

      menuOverlay.style.display = "unset";
      tl.reverse();
      tl.play();
      clearTimeout(timeoutId);
      break;
    // to close the menu.
    case "open":
      tl.reverse();
      tl.play();
      buttonState = "close";
      // to reset the buttonWrapper when animation is finished so that it does't sit above all elements and interrupt other elements interactions.
      timeoutId = setTimeout(() => {
        const size = buttonWrapper.style.getPropertyValue("--size");
        buttonWrapper.style.width = size;
        buttonWrapper.style.height = size;
        box.style.width = size;
        box.style.height = size;
        buttonWrapper.style.overflow = "hidden";
        menuOverlay.style.display = "none";
      }, 1000);
      break;
  }
});

/**
 * Hamburger Menu Animation -- Start of Scripts
 */
const hamburgerIcon = document.querySelector(".anim-icon-menu-003");
/**
 * Load a hamburger menu animation using bodymovin
 */
let hamburgerMenuAnimation = bodymovin.loadAnimation({
  container: hamburgerIcon,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "icon/menuV3.json",
});
hamburgerMenuAnimation.setSpeed(1);

let hamburgerMenuAnimationDirection = 1;
hamburgerIcon.addEventListener("click", (e) => {
  hamburgerMenuAnimation.setDirection(hamburgerMenuAnimationDirection);
  hamburgerMenuAnimation.play();
  hamburgerMenuAnimationDirection = -hamburgerMenuAnimationDirection;
});

/**
 * Hamburger Menu Animation -- End of Scripts
 */
