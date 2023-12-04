window.onload = function () {
  board = document.getElementById("board");
  // board.width = boardWidth;
  // board.height = boardHeight;
  context = board.getContext("2d");

  doodlerRightImg = new Image();
  doodlerRightImg.src = "./img/doodler-right.png";
  doodler.img = doodlerRightImg;

  doodlerRightImg.onload = function () {
    context.drawImage(
      doodler.img,
      doodler.x,
      doodler.y,
      doodler.width,
      doodler.height
    );
  };



  // Instantiate the game
  const game = new Game();
};
