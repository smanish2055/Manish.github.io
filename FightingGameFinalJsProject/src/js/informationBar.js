
console.log(selectedEnemy);
if (selectedHero === "Shadow") {
  document.getElementById("player1Image").src = Hero1;
} else {
    document.getElementById("player1Image").src = Hero2;
}
if (selectedEnemy === "Luna") {
  document.getElementById("player2Image").src = enemy2;
} else {
    document.getElementById("player2Image").src = enemy1;
}

// console.log();

