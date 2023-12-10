class Game {
  constructor() {
    this.boardWidth = 560;
    this.boardHeight = 576;

    this.board = new Board(this.boardWidth, this.boardHeight);

    this.doodlerWidth = 46;
    this.doodlerHeight = 46;
    this.doodlerX = this.boardWidth / 2 - this.doodlerWidth / 2;
    this.doodlerY = (this.boardHeight * 7) / 8 - this.doodlerHeight;

    this.doodlerRightImg = new Image();
    this.doodlerRightImg.src = "./img/doodler-right.png";

    this.doodler = new Doodler(
      this.doodlerX,
      this.doodlerY,
      this.doodlerWidth,
      this.doodlerHeight,
      this.doodlerRightImg
    );

    this.platformWidth = 130;
    this.platformHeight = 20;
    this.platformImg = new Image();
    this.platformImg.src = "./img/platform.png";

    this.platformArray = [];
    this.velocityX = 0;
    this.velocityY = 0;
    this.initialVelocity = -9;
    this.gravity = 0.4;
    this.score = 0;
    this.maxScore = 0;
    this.gameover = false;

    this.gameOverSound = document.getElementById("gameOverSound");
    this.jumpSound = document.getElementById("jumpSound");

    this.initializeGame();
  }

  initializeGame() {
    this.doodlerRightImg.onload = () => {
      context.drawImage(
        this.doodler.img,
        this.doodler.x,
        this.doodler.y,
        this.doodler.width,
        this.doodler.height
      );
    };

    this.doodlerLeftImg = new Image();
    this.doodlerLeftImg.src = "./img/doodler-left.png";

    document.addEventListener("keydown", (e) => this.moveDoodler(e));

    // this.btnsound=true;
    this.velocityY = this.initialVelocity;

    this.placePlatforms();
    requestAnimationFrame(() => this.update());
  }

  jump() {
    // Play jump sound effect
    this.jumpSound.currentTime = 0; // Rewind to the beginning (in case the sound is still playing)
    this.jumpSound.play();
  }

  update() {
    requestAnimationFrame(() => this.update());

    if (this.gameover) {
      return;
    }

    this.board.clear();
    this.doodler.x += this.velocityX;

    if (this.doodler.x < 0) {
      this.doodler.x = this.boardWidth;
    } else if (this.doodler.x > this.boardWidth) {
      this.doodler.x = 0;
    }

    this.velocityY += this.gravity;
    this.doodler.y += this.velocityY;

    if (this.doodler.y > this.boardHeight) {
      this.gameover = true;
    }

    this.doodler.draw(this.board.context);

    for (let i = 0; i < this.platformArray.length; i++) {
      let platform = this.platformArray[i];

      if (this.velocityY < 0 && this.doodler.y < (this.boardHeight * 3) / 4) {
        platform.y -= this.initialVelocity;
      }

      if (this.detectCollision(this.doodler, platform) && this.velocityY >= 0) {
        this.velocityY = this.initialVelocity;
      }

      platform.draw(this.board.context);
    }

    while (
      this.platformArray.length > 0 &&
      this.platformArray[0].y >= this.boardHeight
    ) {
      this.platformArray.shift();
      this.newPlatform();
    }

    this.updateScore();

    this.board.context.fillStyle = "White";
    this.board.context.font = "16px Arial";
    this.board.context.fillText("Score: " + this.score, 10, 20);
    this.board.context.fillStyle = "Red";
    this.board.context.font = "25px Arial";
    if (this.gameover) {
      this.gameOverSound.currentTime = 0;
      this.gameOverSound.play();

      this.board.context.fillText(
        "Game Over : press 'Enter' to Restart ",
        this.boardWidth / 7,
        this.boardHeight / 2
      );
    }
  }

  moveDoodler(e) {
    this.btnsound = true;
    if (btnsound) {
      this.jump(); // Call the jump method when you want the doodler to jump
      btnsound = false;
    }

    if (e.code == "ArrowRight" || e.code == "KeyD") {
      this.velocityX = 2;
      this.doodler.img = this.doodlerRightImg;
    } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
      this.velocityX = -2;
      this.doodler.img = this.doodlerLeftImg;
    } else if ((e.code == "Space" || e.code == "Enter") && this.gameover) {
      this.resetGame();
    }
  }

  placePlatforms() {
    this.platformArray = [];

    let platform = new Platform(
      this.boardWidth / 2,
      this.boardHeight - 50,
      this.platformWidth,
      this.platformHeight,
      this.platformImg
    );
    this.platformArray.push(platform);

    for (let i = 0; i < 6; i++) {
      let randomX = Math.floor((Math.random() * this.boardWidth * 3) / 4);

      let platform = new Platform(
        randomX,
        this.boardHeight - 75 * i - 150,
        this.platformWidth,
        this.platformHeight,
        this.platformImg
      );
      this.platformArray.push(platform);
    }
  }

  newPlatform() {
    let randomX = Math.floor((Math.random() * this.boardWidth * 3) / 4);

    let platform = new Platform(
      randomX,
      -this.platformHeight,
      this.platformWidth,
      this.platformHeight,
      this.platformImg
    );
    this.platformArray.push(platform);
  }

  detectCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  updateScore() {
    let points = Math.floor(Math.random() * 50);

    if (this.velocityY < 0) {
      this.maxScore += points;
      if (this.score < this.maxScore) {
        this.score += this.maxScore;
      }
    } else if (this.velocityY >= 0) {
      this.maxScore -= points;
    }
  }

  resetGame() {
    this.doodler = new Doodler(
      this.doodlerX,
      this.doodlerY,
      this.doodlerWidth,
      this.doodlerHeight,
      this.doodlerRightImg
    );

    this.velocityX = 0;
    this.velocityY = this.initialVelocity;
    this.score = 0;
    this.maxScore = 0;
    this.gameover = false;
    this.placePlatforms();
  }
}
