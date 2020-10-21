// it's just easier to keep track when you make the width of the canvas a variable
const CANVAS_WIDTH = 1500;
const IMG_WIDTH = 2000;
const LEFT_BORDER = 300;
const RIGHT_BORDER = 1200;
const NUM_IMAGES = 11;

class Location {
  constructor(mult) {
    this.x = (CANVAS_WIDTH - IMG_WIDTH) / 2;
    this.mult = mult;
  }
}

let locationArray = [];
let imageArray = [];

function preload() {
  // Init Images
  for (let i = 1; i < NUM_IMAGES + 1; i++) {
    imageArray.push(loadImage("panorama1/" + i + ".png"));
  }

  // Init locations
  for (let i = 0; i < 11; i++) {
    locationArray.push(new Location(i));
  }
}
function setup() {
  createCanvas(CANVAS_WIDTH, 1000);
}

function draw() {
  clear();

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
}
