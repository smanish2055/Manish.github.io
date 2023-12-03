// board measurements
let board;
let boardWidth;
let boardHeight;
let context;

// doodler

let doodlerWidth;
let doodlerHeight;
let doodlerX;
let doodlerY;
let doodlerRightImg;
let doodlerLeftImg;

// doodler objects
let doodler = {
  img: null,
  x: doodlerX,
  y: doodlerY,
  width: doodlerWidth,
  height: doodlerHeight,
};

// physics
// let velocityX;
// let velocityY;//dooder jump speed
// let initialVelocity; //starting velocity
// let gravity;

// platform units
// let platformArray = [];
// let platformWidth;
// let platformHeight;
// let platformImg;

// score achive
  
let score = 0;
let maxScore = 0;
let gameover = false;


let btnsound = false;