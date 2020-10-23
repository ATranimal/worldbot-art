// Constants
const CANVAS_WIDTH = 1500;
const CANVAS_HEIGHT = 750;
const BASE_IMG_WIDTH = 2050;
const LEFT_BORDER = 350;
const RIGHT_BORDER = 1150;
const NUM_IMAGES = 11;

// Classes
class Location {
  constructor(x) {
    this.x = x;
  }
}

// Preloads
let locationArray = [];
let imageArray = [];
let worldBot;
let font;

// State Control
let state = "panorama";
let fade = 0;
let fadeState = "";

function preload() {
  // Init Images
  for (let i = 1; i < NUM_IMAGES + 1; i++) {
    imageArray.push(loadImage("panorama1/" + i + ".png"));
  }

  // Init locations
  for (let i = 0; i < 11; i++) {
    locationArray.push(
      new Location((CANVAS_WIDTH - (BASE_IMG_WIDTH + i * 25)) / 2)
    );
  }

  worldBot = loadImage("logo-ring.png");

  font = loadFont("RobotoMono.ttf");
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  textFont(font, 36);
  textAlign(CENTER);
}

function draw() {
  clear();

  switch (state) {
    case "panorama":
      drawPanorama();
      break;
    case "intro":
      drawIntro();
      break;
    default:
      break;
  }

  if (fadeState !== "") {
    if (fade > 350) {
      fadeState = "fade-out";
      state = "panorama";
    }
    if (fade < 0) {
      fadeState = "";
    }

    fill(0, fade);

    fadeState === "fade-in" ? (fade += 1) : (fade -= 0.5);

    rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function mouseReleased() {
  if (state === "intro") {
    if (mouseX > 550 && mouseX < 950 && mouseY > 145 && mouseY < 605) {
      worldBot = loadImage("happy_emoji.png");
      floatSpeed = 4;
      floatHeight = 50;
      fadeState = "fade-in";
    }
  }
}

// Function specific
let floatTimer = 0;
let floatSpeed = 1;
let floatHeight = 30;
const drawIntro = () => {
  background("#592AB3");

  floatTimer += 0.04;

  let worldBotYChange = Math.sin(floatTimer * floatSpeed) * floatHeight;
  image(worldBot, 550, 175 + worldBotYChange, 400, 400);

  fill(0);
  text(
    "Hi! I'm world bot. I want to show you one of my worlds.",
    150,
    305,
    300
  );
  text("Please click me and get ready to enter.", 1000, 305, 300);
};

const turnSpeed = 200;
const drawPanorama = () => {
  //// if the mouse moves to the left, the images move slightly to the right
  if (fadeState === "") {
    if (mouseX < LEFT_BORDER) {
      locationArray.forEach((layer, idx) => {
        // If the front image is full scrolled
        if (!(locationArray[0].x > 0)) {
          let mouseVector = (LEFT_BORDER - mouseX) / turnSpeed;
          let layerVector = (idx * 25 + 550) / 550;
          layer.x += mouseVector * layerVector;
        }
      });
    } else if (mouseX > RIGHT_BORDER) {
      locationArray.forEach(function (layer, idx) {
        // If the front image is full scrolled
        if (!(locationArray[0].x <= -550)) {
          let mouseVector = (RIGHT_BORDER - mouseX) / turnSpeed;
          let layerVector = (idx * 25 + 550) / 550;
          layer.x += mouseVector * layerVector;
        }
      });
    }
  }
  // draw all the images
  for (let i = NUM_IMAGES - 1; i > -1; i--) {
    image(imageArray[i], locationArray[i].x, 0);
  }

  // image(imageArray[i], locationArray[i].x, 0);
};
