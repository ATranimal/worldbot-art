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

class PanoramaMouseover {
  constructor(layer, coordinates, text) {
    this.layer = layer;
    this.coordinates = coordinates;
    this.text = text;
  }
}

// Preloads
let locationArray = [];
let imageArray = [];
let panoramaMouseOver = [
  [
    4,
    200,
    450,
    300,
    650,
    "Most of Ana’s inhabitants have found themselves quite shaken by its anxieties—sometimes literally! But Misin, as Maggie told me, “has learned to cope with anxiety in their own life, and so is relatively unaffected compared to those around them.” Now, “they have decided to organize a group of caretakers to guide the planet and people in their community through their anxiety.”",
  ],
  [
    8,
    1550,
    1900,
    250,
    500,
    "Seb told me about this place. “In this world,” they explained, “there is a place that needs space. A planet too overwhelmed by the changes and shifts in others it relocated itself within the galaxy. It moves of its own accord and shifts its path drifting through the galaxy, always keeping its distance and always moving in a new direction.”",
  ],
  [
    8,
    1000,
    1250,
    150,
    450,
    "Once, Ana orbited around a star and slumbered, unaware of the kinds of emotions other lifeforms experience. Since the shift, though, it feels as we do. Its anxieties and fears make themselves felt as tremors in the earth and shifts in the clouds. It wanders in darkness, but light creeps in across dimensions, finding ways to give life to the people who inhabit it.",
  ],
  [
    8,
    2100,
    2400,
    150,
    450,
    "Eryn told me that this planet’s name is Ana. Some say it comes from Analogous – an allusion to the sense of surprising harmony that many have felt during the shift. But, Eryn warned me, “those who are skeptical of newfound traditions whisper a different name like a curse under their breath: Anathema.”",
  ],
  [
    5,
    1600,
    1650,
    650,
    750,
    "The shift has created opportunities for some – but others, like the Keeper, have been forced to rethink their relationship to their world. When the planet awoke, the Keeper was dethroned, Aruna told me. “Once a leader for their ability to communicate with the Land, now the Keeper is called a charlatan and a doom bringer.” But they continue their work in exile, “engaging in deep meditation in the morning, using fresh produce for meals, and sleeping beneath the ever-brighter night sky. They await the day that the Land will speak to them again. The thing that gives them hope most is that the area around them is always calm, like the Land is trying its best to keep them safe. A friend is not forgotten so easily.”",
  ],
];
// Structure of each object (layer, x0, x1, y0, y1, text)

let locationTwoArray = [];
let imageTwoArray = [];
let panoramaTwoMouseOver = [
  [
    3,
    700,
    1050,
    530,
    750,
    `Festivals attract all sorts of people. Even—or especially—those who lie, cheat and steal. Eryn told me the story of this one: 
"They say I'm the greatest gem-shaper of our time," They sigh, regret plan in their voice, "What a load of cabbage crust that is.. we both know that.." their arms had spread with a dramatic flare at the admission, they paused. A fold in the brow conveying something slimy they felt just below the surface, so great that their companion could feel the shame as well. When they found their voice it was a low admission, with none their usual penchant for theatrics, "You know, the piece didn't belong to me. Something my apprentice drew up plans for, had been working away at." A tear glistens in their many eyes.
`,
  ],
  [
    4,
    1950,
    2115,
    450,
    700,
    `In some circles, alignment festivals have become rather controversial. Maggie passed along this archival document, a letter of protest from the very first planetary alignment festival: 
“Planetary alignment has long been a vital and vibrant part of our culture, but to set aside the stability, productivity, and wellbeing of our communities to celebrate these superior beings who need nothing from us is negligence. Further, are we not wasting the resources bestowed upon us by our planets in our pursuit of opulence and gluttony? The Occupant Protection Organization (OPO) puts forward the simple proposal that our valuable time, energy, and resources would be better spent ensuring our survival in an unpredictable and tumultuous world.”
`,
  ],
  [
    7,
    500,
    850,
    150,
    500,
    `At this particular festival, the alignment of the planets coincides with the blooming of the magnolia trees on the fourth planet from the Sun. As Seb told me, the planet grew trees ten storeys high in preparation for the event. “At the height of spring” – perhaps shortly after this panorama would have taken place – “massive petals from the flowers cascade down to the ground, covering other plant life, even homes and buildings. Thrill-seeking inhabitants can climb the magnolia trees and from their place see the horizons of the other planets, planets brimming with life and their atmospheres rippling. Nature in these months knows no limits, no boundaries, but instead of fearing their environment, inhabitants find beauty in the alien landscapes and the expressions of their planet's joy.” `,
  ],
  [
    3,
    1750,
    1900,
    560,
    750,
    `An archivist named Curren eagerly awaits the alignment festival—not necessarily for the celebrations (though they enjoy those as well) but for the data that the event affords their ongoing research. Aruna submitted an original document to me, a series of detailed calculations that take up over three pages. In the margins is scrawled the following, in sharp, quick handwriting: 
“What could have provoked the merging of galaxies? A force beyond our understanding for now. I wonder if older archives can give us insight using ancient belief systems. On the off-chance this is a cyclical event, perhaps ancient religious texts can be re-examined for patterns.”
`,
  ],
];
let worldBot;
let font;

// State Control
let state = "intro"; // intro || panorama || panorama2
let fade = 0;
let fadeState = ""; // "" || fade-in || fade-out

let introMusic;
let musicVolume = 0;

function preload() {
  soundFormats("mp3");
  introMusic = loadSound("intro.mp3");
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

  // Init Images
  for (let i = 1; i < NUM_IMAGES + 1; i++) {
    imageTwoArray.push(loadImage("panorama2/" + i + ".png"));
  }

  // Init locations
  for (let i = 0; i < 11; i++) {
    locationTwoArray.push(
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

  introMusic.loop();
  introMusic.play();
}

function draw() {
  clear();

  switch (state) {
    case "panorama":
      drawPanorama();
      break;
    case "panorama2":
      drawPanoramaTwo();
      break;
    case "intro":
      drawIntro();
      break;
    default:
      break;
  }

  if (fadeState !== "") {
    if (fade > 800) {
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

    if (musicVolume > 0) {
      musicVolume -= 0.005;
      introMusic.setVolume(musicVolume);
    } else if (musicVolume < 0) {
      musicVolume = 0;
      introMusic.setVolume(0);
    }

    rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (
      (fade > 255 && fadeState === "fade-in" && state === "intro") ||
      (fade > 0 && fadeState === "fade-out" && state === "panorama")
    ) {
      fill("#FFFFFF");
      textFont(font, 32);
      textAlign(CENTER);
      text(
        "No one quite knows how the shift happened. All they know is that they are conscious now in a way they weren’t before. Some people can change form; others can sense things in new ways. Time works differently. And planets – like this one – can feel, think, speak and sing. ",
        240,
        180,
        CANVAS_WIDTH - 480,
        CANVAS_HEIGHT
      );
    }
    if (
      (fade > 300 && fadeState === "fade-in" && state === "panorama") ||
      (fade > 0 && fadeState === "fade-out" && state === "panorama2")
    ) {
      fill("#FFFFFF");
      textFont(font, 32);
      textAlign(CENTER);
      text(
        "Many people now find joy in connections, resonances and alignment. And the grandest alignment of all is that of the planets. Planetary alignment festivals can span entire solar systems and bring wanderers and curious folks from all over the place, who find a deep sense of belonging, the potential for lasting friendships, and excellent refreshments. The planets, too, enjoy the chance to reconnect and catch up.",
        240,
        180,
        CANVAS_WIDTH - 480,
        CANVAS_HEIGHT
      );
    }
  }
}

function mouseReleased() {
  if (state === "intro") {
    if (mouseX > 550 && mouseX < 950 && mouseY > 70 && mouseY < 550) {
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
  background("#06006F");

  if (musicVolume < 1 && fadeState === "") {
    introMusic.setVolume(musicVolume);
    musicVolume += 0.0015;
  }

  floatTimer += 0.04;

  let worldBotYChange = Math.sin(floatTimer * floatSpeed) * floatHeight;
  image(worldBot, 550, 100 + worldBotYChange, 400, 400);

  if (!(fade > 0)) {
    textFont(font, 20);
    fill("#000000");
    text(
      "Hello! I’m Worldbot. I’m an archivist of sorts — I travel around the Universe through light and data looking for people to share worlds with me. I’ve come to Remote Realities to present the most recent addition to my archive, which I collected from four world-keepers—Maggie, Seb, Aruna and Eryn—who live together in a place called Discord.",
      98,
      98,
      450
    );
    text(
      "When my archive is inspired by a world, it dreams up visualizations that its visitors can explore. You can explore these ones by moving your mouse left and right. When you hover over certain objects, my archive will tell you about them. This time, my archive dreamed up two visualizations – so if you want to see the other one, click on my face and I’ll take you to it.",
      998,
      98,
      450
    );
    text(
      `Soon, I’ll be moving to Discord more permanently to collect more worlds. If you’d like to make one with me, there’s a link in the description where you can learn more. 

I hope you enjoy exploring my archive! Click on me to get started.  
`,
      398,
      548,
      700
    );

    fill("#FFFFFF");

    text(
      "Hello! I’m Worldbot. I’m an archivist of sorts — I travel around the Universe through light and data looking for people to share worlds with me. I’ve come to Remote Realities to present the most recent addition to my archive, which I collected from four world-keepers—Maggie, Seb, Aruna and Eryn—who live together in a place called Discord.",
      100,
      100,
      450
    );
    text(
      "When my archive is inspired by a world, it dreams up visualizations that its visitors can explore. You can explore these ones by moving your mouse left and right. When you hover over certain objects, my archive will tell you about them. This time, my archive dreamed up two visualizations – so if you want to see the other one, click on my face and I’ll take you to it.",
      1000,
      100,
      450
    );
    text(
      `Soon, I’ll be moving to Discord more permanently to collect more worlds. If you’d like to make one with me, there’s a link in the description where you can learn more. 

I hope you enjoy exploring my archive! Click on me to get started.  
`,
      400,
      550,
      700
    );
  }
};

const turnSpeed = 230;
let puffBallTimer = 0;
let puffBallSpeed = 0.07;
let puffBallHeight = 15;
let panoramaEndLimit = 75; // Based on puffBallTimer
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

  if (!(fade > 0)) {
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
          textFont(font, 18);
          textAlign(LEFT);
          fill(0);
          let xPosition = mouseX > CANVAS_WIDTH / 2 ? 20 : CANVAS_WIDTH / 2;
          fill("#000000");
          text(hoverText, xPosition, CANVAS_HEIGHT / 2 - 120, CANVAS_WIDTH / 2);
          text(
            hoverText,
            xPosition + 1,
            CANVAS_HEIGHT / 2 - 121,
            CANVAS_WIDTH / 2
          );
          fill("#FFFFFF");
          text(
            hoverText,
            xPosition + 2,
            CANVAS_HEIGHT / 2 - 122,
            CANVAS_WIDTH / 2
          );
        }
      }
    });
  }

  // Draw the next scene text
  if (puffBallTimer > panoramaEndLimit) {
    image(worldBot, 400, 0, 100, 100);
    textFont(font, 18);
    textAlign(LEFT);
    fill(0);
    text("If you're ready to move on, just click on me again", 500, 50);
  }
};

let petalTimer = 0;
let petalSpeed = 0.07;
let petalHeight = 15;
const drawPanoramaTwo = () => {
  // if the mouse moves to the left, the images move slightly to the right
  if (fadeState === "") {
    if (mouseX < LEFT_BORDER) {
      locationTwoArray.forEach((layer, idx) => {
        // If the front image is full scrolled
        if (!(locationTwoArray[0].x > 0)) {
          let mouseVector = (LEFT_BORDER - mouseX) / turnSpeed;
          let layerVector = (idx * 25 + 550) / 550;
          layer.x += mouseVector * layerVector;
        }
      });
    } else if (mouseX > RIGHT_BORDER) {
      locationTwoArray.forEach(function (layer, idx) {
        // If the front image is full scrolled
        if (!(locationTwoArray[0].x <= -550)) {
          let mouseVector = (RIGHT_BORDER - mouseX) / turnSpeed;
          let layerVector = (idx * 25 + 550) / 550;
          layer.x += mouseVector * layerVector;
        }
      });
    }
  }

  // puff balls
  locationTwoArray[0].x += 0.03;
  locationTwoArray[1].x += 0.03;
  let petalChange1 = Math.sin(petalTimer * petalSpeed) * petalHeight;
  let petalChange2 = Math.cos(petalTimer * petalSpeed) * petalHeight;

  // draw all the images
  for (let i = NUM_IMAGES - 1; i > -1; i--) {
    if (i === 0) {
      image(imageTwoArray[i], locationTwoArray[i].x, petalChange1);
    } else if (i === 1) {
      image(imageTwoArray[i], locationTwoArray[i].x, petalChange2);
    } else {
      image(imageTwoArray[i], locationTwoArray[i].x, 0);
    }
  }

  // Determine Hover Text
  if (!(fade > 0)) {
    panoramaTwoMouseOver.forEach((textArea) => {
      // Structure of each object (layer, x0, x1, y0, y1, text)
      const layer = textArea[0];
      const x0 = textArea[1];
      const x1 = textArea[2];
      const y0 = textArea[3];
      const y1 = textArea[4];
      const hoverText = textArea[5];

      if (
        mouseX > x0 + locationTwoArray[layer].x &&
        mouseX < x1 + locationTwoArray[layer].x
      ) {
        if (mouseY > y0 && mouseY < y1) {
          textFont(font, 18);
          textAlign(LEFT);
          fill(0);
          let xPosition = mouseX > CANVAS_WIDTH / 2 ? 20 : CANVAS_WIDTH / 2;
          fill("#000000");
          text(hoverText, xPosition, CANVAS_HEIGHT / 2 + 50, CANVAS_WIDTH / 2);
          text(
            hoverText,
            xPosition + 1,
            CANVAS_HEIGHT / 2 + 51,
            CANVAS_WIDTH / 2
          );
          fill("#FFFFFF");
          text(
            hoverText,
            xPosition + 2,
            CANVAS_HEIGHT / 2 + 52,
            CANVAS_WIDTH / 2
          );
        }
      }
    });
  }
};
