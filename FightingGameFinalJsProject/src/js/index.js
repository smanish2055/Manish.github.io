/* ------------------- mover characters with EventListener ------------------ */
let defendCount = 0;
let isVPressed = false;
let isControlPressed = false;
enemy.isEnemyControlPressed = false;
player.isPlayerControlPressed = false;
let isSpacePressed = false; //if  space is press then s and combo should not work
let isZeroPressed = false; //if  zero is press then s and combo should not work
window.addEventListener("keydown", (event) => {
  // console.log(event);
  if (!player.dead) {
    switch (event.key) {
      case "d":
        sound.herorun("on");
        keys.d.pressed = true;
        console.log(event.key);
        break;
      case "a":
        sound.herorun("on");
        keys.a.pressed = true;

        console.log(event.key);
        break;
      case "w":
        if (selectedHero == "Blaze") {
          sound.jump("blaze");
        } else {
          sound.jump("samurai");
        }
        keys.w.pressed = true;

        break;

      case "f":
        isVPressed = true;
        break;

      case "s":
        if (isVPressed && !isSpacePressed) {
          player.isPlayerControlPressed = true;
          defendCount = defendCount + 1;
          player.SpecialAttack();
          console.log("this is v + space");
        } else {
          if (!isSpacePressed) {
            if (selectedHero == "Blaze") {
              sound.Blaze();
            } else {
              sound.smuraimack();
            }
            if (defendCount < 3) {
              defendCount = defendCount + 1;
            } else {
              // Reset defendCount to 0 after reaching 3
              defendCount = 0;
            }
            player.attack();
          }
        }
        break;

      case " ":
        sound.shieldDefend();
        isSpacePressed = true;
        keys.f.pressed = true;
        break;
    }
  }
  if (!enemy.dead) {
    switch (event.key) {
      case "ArrowRight":
        sound.enemyrun("on");
        keys.ArrowRight.pressed = true;

        console.log(event.key);
        break;
      case "ArrowLeft":
        sound.enemyrun("on");
        keys.ArrowLeft.pressed = true;
        console.log(event.key);
        break;
      case "ArrowUp":
        if (selectedEnemy == "Luna") {
          sound.jump("luna");
        } else {
          sound.jump("thunder");
        }
        keys.ArrowUp.pressed = true;

        break;

      case "Shift":
        isControlPressed = true;
        break;

      case "ArrowDown":
        if (isControlPressed && !isZeroPressed) {
          enemy.isEnemyControlPressed = true;
          enemy.SpecialAttack();
        } else {
          if (!isZeroPressed) {
            if (selectedEnemy == "Luna") {
              sound.luna();
            } else {
              sound.kanji();
            }

            enemy.attack();
          }
        }
        break;

      case "Insert":
        sound.shieldDefend();
        isZeroPressed = true;
        keys.Insert.pressed = true;
        break;
    }
  }
});

/* ---------------------------------- keyup ------------------------------------------------------------------------------------------- */
/* ---------------------------------- keyup ------------------------------------------------------------------------------------------- */
if (!enemy.dead) {
  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "d":
        sound.herorun();
        keys.d.pressed = false;
        break;
      case "a":
        sound.herorun();
        keys.a.pressed = false;
        break;
      case "w":
        keys.w.pressed = false;
        break;

      case "f":
        isVPressed = false;
        player.isPlayerControlPressed = false;
        break;

      case " ":
        keys.f.pressed = false;
        isSpacePressed = false;
        break;

      case "ArrowRight":
        sound.enemyrun();
        keys.ArrowRight.pressed = false;

        break;

      case "ArrowLeft":
        sound.enemyrun();
        keys.ArrowLeft.pressed = false;
        break;
      case "ArrowUp":
        keys.ArrowUp.pressed = false;
        break;

      case "Shift":
        isControlPressed = false;
        enemy.isEnemyControlPressed = false;

        break;
      case "Insert":
        isZeroPressed = false;
        keys.Insert.pressed = false;
        break;
    }

    console.log(event.key);
  });
}
