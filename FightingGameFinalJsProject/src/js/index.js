/* ------------------- mover characters with EventListener ------------------ */

let isVPressed = false;
let isControlPressed = false;
enemy.isEnemyControlPressed = false;
player.isPlayerControlPressed = false;

window.addEventListener("keydown", (event) => {
  // console.log(event);
  if (!player.dead) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        console.log(event.key);
        break;
      case "a":
        keys.a.pressed = true;
        console.log(event.key);
        break;
      case "w":
        keys.w.pressed = true;

        break;

      case "c":
        isVPressed = true;
        break;

      case "z":
        if (isVPressed) {
          // Space + Alt combo
          player.isPlayerControlPressed = true;
          player.SpecialAttack();
          console.log("this is v + space");
        } else {
          player.attack();
        }
        break;
      
      case "f":
        // console.log("q");
        keys.f.pressed = true;
        // enemy.defend();
        break;
    }
  }
  // console.log(event.key);
  if (!enemy.dead) {
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;

        console.log(event.key);
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        console.log(event.key);
        break;
      case "ArrowUp":
        keys.ArrowUp.pressed = true;

        break;

      case "Shift":
        isControlPressed = true;
        break;

      case "ArrowDown":
        if (isControlPressed) {
          // Space + Alt combo
          enemy.isEnemyControlPressed = true;
          enemy.SpecialAttack();

          console.log("this is control + arrowdown");
        } else {
          enemy.attack();
        }
        break;
      
      case "Insert":
        // console.log("q");
        keys.Insert.pressed = true;
        // enemy.defend();
        break;
    }
  }
});

/* ---------------------------------- keyup --------------------------------- */
if (!enemy.dead) {
  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "d":
        keys.d.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
      case "w":
        keys.w.pressed = false;
        break;

      case " ":
        isVPressed = false;
        player.isPlayerControlPressed = false;
        break;
      
      case "f":
        // console.log("q");
        keys.f.pressed = false;
        // enemy.defend();
        break;

      case "ArrowRight":
        keys.ArrowRight.pressed = false;

        break;

      case "ArrowLeft":
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
        // console.log("q");
        keys.Insert.pressed = false;
        // enemy.defend();
        break;
    }

    console.log(event.key);
  });
}
