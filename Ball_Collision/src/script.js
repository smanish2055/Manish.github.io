const viewport = document.getElementById("viewport");

const ballArray = [];

viewport.style.height = `${VIEW_HEIGHT}px`;
viewport.style.width = `${VIEW_WIDTH}px`;

for (let i = 0; i < BALL_COUNT; i++) {
  const radius = getRandomNumber(10, 20);
  const color = getRandomColor();
  let ballWidth = radius * 2;

  const randomX = getRandomNumber(0, VIEW_WIDTH - ballWidth);
  const randomY = getRandomNumber(0, VIEW_HEIGHT - ballWidth);


  // setting up constructor by object
  let ball = new Ball(randomX, randomY, radius, color);

  ballArray.push(ball);

  // here we add the balls to the viewport and add them to the ball array and update the viewport accordingly 
  viewport.appendChild(ball.getElement());
}

function render() {
  ballArray.forEach((ball) => {
    ball.draw();
    ball.move();
    ball.checkBallCollision(ballArray);
    ball.checkWallCollison();
  });
  requestAnimationFrame(render);
}

render();
