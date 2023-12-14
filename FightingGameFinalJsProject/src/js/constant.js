var count = true;
  let player1win=0;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
ctx.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;

const Hero1 = "./src/img/Hero1.png";
const Hero2 = "./src/img/Hero2.png";
const enemy1 = "./src/img/Enemy1.png";
const enemy2 = "./src/img/Enemy2.png";