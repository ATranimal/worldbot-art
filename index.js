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
let panoramaMouseOver = [[4, 200, 450, 300, 650, "The wanderer in the field"]];
// Structure of each object (layer, x0, x1, y0, y1, text)
let worldBot;
let font;

// State Control
let state = "intro"; // intro || panorama
let fade = 0;
let fadeState = ""; // "" || fade-in || fade-out

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
      if (state === "intro") {
        state = "panorama";
      } else if (state === "panorama") {
        state = "panorama2";
      }
    }
    if (fade < 0) {
      fadeState = "";
    }

    fill(0, fade);

    fadeState === "fade-in" ? (fade += 1) : (fade -= 1);

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

  if (state === "panorama" && puffBallTimer > panoramaEndLimit) {
    if (mouseX > 400 && mouseX < 500 && mouseY > 0 && mouseY < 100) {
      fade = 0;
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

const turnSpeed = 230;
let puffBallTimer = 0;
let puffBallSpeed = 0.07;
let puffBallHeight = 15;
let panoramaEndLimit = 10; // Based on puffBallTimer
const drawPanorama = () => {
  puffBallTimer += 0.04;

  // if the mouse moves to the left, the images move slightly to the right
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

  // puff balls
  locationArray[2].x += 0.03;
  locationArray[3].x += 0.03;
  let puffBallChange1 =
    Math.sin(puffBallTimer * puffBallSpeed) * puffBallHeight;
  let puffBallChange2 =
    Math.cos(puffBallTimer * puffBallSpeed) * puffBallHeight;

  //clouds
  locationArray[9].x -= 0.01;

  // draw all the images
  for (let i = NUM_IMAGES - 1; i > -1; i--) {
    if (i === 2) {
      image(imageArray[i], locationArray[i].x, puffBallChange1);
    } else if (i === 3) {
      image(imageArray[i], locationArray[i].x, puffBallChange2);
    } else {
      image(imageArray[i], locationArray[i].x, 0);
    }
  }

  // Determine Hover Text
  panoramaMouseOver.forEach((textArea) => {
    // Structure of each object (layer, x0, x1, y0, y1, text)
    const layer = textArea[0];
    const x0 = textArea[1];
    const x1 = textArea[2];
    const y0 = textArea[3];
    const y1 = textArea[4];
    const hoverText = textArea[5];

    if (
      mouseX > x0 + locationArray[layer].x &&
      mouseX < x1 + locationArray[layer].x
    ) {
      if (mouseY > y0 && mouseY < y1) {
        textFont(font, 36);
        text(hoverText, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      }
    }
  });

  // Draw the next scene text
  if (puffBallTimer > panoramaEndLimit) {
    image(worldBot, 400, 0, 100, 100);
    textFont(font, 18);
    textAlign(LEFT);
    fill(0);
    text("If you're ready to move on, just click on me again", 500, 50);
  }
};
