/* ----------------------------- collision brain -------------------------------------- */
function Collision({ rectangle1, rectangle2 }) {
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

  var resultText = document.querySelector("#resultText");
  var playAgainButton = document.getElementById("playAgainButton");

  if (player.health > enemy.health) {
    resultText.innerHTML = "Player 1 wins 🥇";
    frizeObject();
    document.querySelector("#displayResult").style.background =
      "linear-gradient(to right, #001f3f, #000000)";
  } else if (player.health < enemy.health) {
    resultText.innerHTML = "Player 2 wins 🥇";
    frizeObject();
    document.querySelector("#displayResult").style.background =
      "linear-gradient(to right, #001f3f, #000000)";
  } else {
    resultText.innerHTML = "Draw 👍";
    sound.Dead("game-draw");
    document.querySelector("#displayResult").style.background =
      "linear-gradient(to right, #001f3f, #000000)";
    setTimeout(function () {
      player.dead = true;
      enemy.dead = true;
    }, 1000);
  }
  // Show the "Play Again" button
  playAgainButton.style.display = "block";
}

/* ----------------------------  sound mute --------------------------- */
function frizeObject() {
  setTimeout(function () {
    player.dead = true;
    enemy.dead = true;
    sound.smuraimack("off");
    sound.luna("off");
    sound.kanji("off");
    sound.Blaze("off");
    sound.enemyrun("");
  }, 2000);
}

function playAgain() {
  // Reload the window when the "Play Again" button is clicked
  sound.Dead("game-draw");
  setTimeout(() => {
    location.reload();
  }, 500);
}

// Hide the "Play Again" button initially
document.getElementById("playAgainButton").style.display = "none";

/* -------------------------- main page auto button ----------------------------------------------- */
function computer() {
  // Set a value in localStorage
  sound.autoenemy();

  var button = document.getElementById("auto");
  button.classList.toggle("clicked");
  if (button.classList.contains("clicked")) {
    button.style.backgroundColor = "red";
    localStorage.setItem("auto", true);
  } else {
    button.style.backgroundColor = "green";
    localStorage.removeItem("auto");
  }
}
