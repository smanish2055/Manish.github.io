class Ball {
  constructor(xAxis, yAxis, radius, color) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.radius = radius;

    this.color = color;

    this.element = document.createElement("div");
    this.element.className = "ball";

    this.moveX = getRandomNumber(-1, 1);
    this.moveY = getRandomNumber(-1, 1);
  }
  getElement = () => {
    return this.element;
  };

  draw() {
    this.element.style.width = `${this.radius * 2}px`;
    this.element.style.height = `${this.radius * 2}px`;
    this.element.style.left = `${this.xAxis}px`;
    this.element.style.top = `${this.yAxis}px`;
    this.element.style.background = this.color;
  }

  move = () => {
    this.xAxis += this.moveX * SPEED;
    this.yAxis += this.moveY * SPEED;
  };

  // checkWall collision detection
  checkWallCollison() {
    if (this.xAxis + this.radius * 2 > VIEW_WIDTH) {
      this.xAxis = VIEW_WIDTH - this.radius * 2;
      this.moveX = -this.moveX;
    }
    if (this.xAxis < 0) {
      this.xAxis = 0;
      this.moveX = -this.moveX;
    }
    if (this.yAxis < 0) {
      this.yAxis = 0;
      this.moveY = -this.moveY;
    }
    if (this.yAxis + this.radius * 2 > VIEW_HEIGHT) {
      this.yAxis = VIEW_HEIGHT - this.radius * 2;
    }
  }

  // ball collision detection
  checkBallCollision(balls) {
    for (const ball of balls) {
      if (ball == this) return;
      else {
        // const dx = this.xAxis - ball.xAxis;
        // const dy = this.yAxis - ball.yAxis;

        const dx = this.xAxis - ball.xAxis;
        const dy = this.yAxis - ball.yAxis;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // const distance = calcDistance(ball.xAxis, ball.yAxis, this.xAxis, this.yAxis);
        console.log(distance);
        if (distance < this.radius + ball.radius) {
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          const thisMoveX = this.moveX * cos + this.moveY * sin;
          const thisMoveY = this.moveY * cos - this.moveX * sin;
          const ballMoveX = ball.moveX * cos + ball.moveY * sin;
          const ballMoveY = ball.moveY * cos - ball.moveX * sin;

          // Swap velocities
          this.moveX = ballMoveX;
          this.moveY = ballMoveY;
          ball.moveX = thisMoveX;
          ball.moveY = thisMoveY;

          // Move balls away from each other to avoid sticking
          const overlap = this.radius + ball.radius - distance + 1;
          this.xAxis += overlap * cos;
          this.yAxis += overlap * sin;
        }
      }
    }
  }
}
