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
/* ------------------------ calling decrease Timer fn ----------------------- */
var interval = setInterval(() => {
  DecreaseTimer();
}, 1000);

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
  // var displayResult = document.querySelector("#displayResult");
  var resultText = document.querySelector("#resultText");
  var playAgainButton = document.getElementById("playAgainButton");

  if (player.health > enemy.health) {
   
    // console.log(player1win)
    // localStorage.setItem("Player1", player1win);
    resultText.innerHTML = "Player 1 wins 🥇";
  } else if (player.health < enemy.health) {
    // localStorage.setItem("Player2", "⭐");
    resultText.innerHTML = "Player 2 wins 🥇";
  } else {
    resultText.innerHTML = "Draw 👍";
  }

  // Show the "Play Again" button
  playAgainButton.style.display = "block";
}

function playAgain() {
  // Reload the window when the "Play Again" button is clicked
  location.reload();
}

// Hide the "Play Again" button initially
document.getElementById("playAgainButton").style.display = "none";
