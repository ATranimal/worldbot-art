// it's just easier to keep track when you make the width of the canvas a variable
const CANVAS_WIDTH = 1500;
const CANVAS_HEIGHT = 750;
const IMG_WIDTH = 2050;
const LEFT_BORDER = 300;
const RIGHT_BORDER = 1200;
const NUM_IMAGES = 11;

let font;

class Location {
  constructor(mult) {
    this.x = (CANVAS_WIDTH - IMG_WIDTH) / 2;
    this.mult = mult;
  }
}

let locationArray = [];
let imageArray = [];

let worldBot;

let state = "intro";
let fade = 0;
let fadeState = "";

function preload() {
  // Init Images
  for (let i = 1; i < NUM_IMAGES + 1; i++) {
    imageArray.push(loadImage("panorama1/" + i + ".png"));
  }

  // Init locations
  for (let i = 0; i < 11; i++) {
    locationArray.push(new Location(i));
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

const drawPanorama = () => {
  // if the mouse moves to the left, the images move slightly to the right
  if (mouseX < LEFT_BORDER) {
    locationArray.forEach((layer, idx) => {
      if (!(locationArray[NUM_IMAGES - 1].x > 300)) {
        console.log(locationArray);
        layer.x = layer.x + layer.mult * ((LEFT_BORDER - mouseX) / 100);
      }
    });
  } else if (mouseX > RIGHT_BORDER) {
    locationArray.forEach(function (layer) {
      if (!(locationArray[NUM_IMAGES - 1].x < -790)) {
        layer.x = layer.x - layer.mult * ((mouseX - RIGHT_BORDER) / 100);
      }
    });
  }

  // draw all the images
  for (let i = NUM_IMAGES - 1; i > -1; i--) {
    image(imageArray[i], locationArray[i].x, 0);
  }
};
