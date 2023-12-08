function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

/* ---------------------------------- timer --------------------------------- */

var timer = 60;
function DecreaseTimer() {
  if (timer >= 0) {
    document.querySelector(".healthBar__timer").innerHTML = timer;

    // calling finalwinner
    if (timer === 0) {
      FinalWinner({ player, enemy });
    }
    timer--;
  } else {
    clearInterval(interval);
  }
}

/* ---------------------- determination of final winner --------------------- */
function FinalWinner({ player, enemy }) {
  clearInterval(interval);
  if (player.health > enemy.health) {
    document.querySelector("#displayResult").innerHTML = "Player 1 win 🥇";
  }
  if (player.health < enemy.health) {
    document.querySelector("#displayResult").innerHTML = "Player 2 win 🥇";
  }
  if (player.health === enemy.health) {
    document.querySelector("#displayResult").innerHTML = "Draw 👍";
  }
}
