const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
ctx.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./src/img/background.png",
});

const shop = new Sprite({
  position: {
    x: 600,
    y: 134,
  },
  imageSrc: "./src/img/shop.png",
  scale: 2.75,
  framesMax: 6,
});

const selectedHero = localStorage.getItem("selectedHero");
const selectedEnemy = localStorage.getItem("selectedEnemy");

let Blaze = false;
let Shadow = false;
switch (selectedHero) {
  case "Blaze":
    Blaze = true;
    break;
  case "Shadow":
    Shadow = true;
    break;
}

let Thunder = false;
let Luna = false;
switch (selectedEnemy) {
  case "Thunder":
    Thunder = true;
    break;
  case "Luna":
    Luna = true;
    break;
}

/* - creating player and enemy objects and passing arguments to constructor - */

let player;
if (Blaze) {
  player = new Fighters({
    position: {
      x: 0,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 10,
    },
    imageSrc: "./src/img/HighForest/Idle-Sheet.png",
    framesMax: 4,
    scale: 2.5,

    offset: {
      x: 50,
      y: 10,
    },

    sprites: {
      idle: {
        imageSrc: "./src/img/HighForest/Idle-Sheet.png",
        framesMax: 4,
      },
      run: {
        imageSrc: "./src/img/HighForest/Run-Sheet.png",
        framesMax: 8,
      },
      runLeft: {
        imageSrc: "./src/img/HighForest/Run-Sheet-Left.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./src/img/HighForest/Jump-Start-Sheet.png",
        framesMax: 4,
      },
      fall: {
        imageSrc: "./src/img/HighForest/Jump-End-Sheet.png",
        framesMax: 3,
      },
      attack1: {
        imageSrc: "./src/img/HighForest/Attack-01-Sheet.png",
        framesMax: 8,
      },
      takeHit: {
        imageSrc: "./src/img/HighForest/Jump-End-Sheet.png",
        framesMax: 3,
      },
      Death: {
        imageSrc: "./src/img/HighForest/Dead-Sheet.png",
        framesMax: 8,
      },
    },

    attackBox: {
      offset: {
        x: 40,
        y: 50,
      },
      width: 160,
      height: 50,
    },
  });
}

if (Shadow) {
  player = new Fighters({
    position: {
      x: 0,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 10,
    },
    imageSrc: "./src/img/samuraiMack/Idle.png",
    framesMax: 8,
    scale: 2.5,

    offset: {
      x: 215,
      y: 158,
    },

    sprites: {
      idle: {
        imageSrc: "./src/img/samuraiMack/Idle.png",
        framesMax: 8,
      },
      run: {
        imageSrc: "./src/img/samuraiMack/Run.png",
        framesMax: 8,
      },
      runLeft: {
        imageSrc: "./src/img/samuraiMack/SRun-Left.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./src/img/samuraiMack/jump.png",
        framesMax: 2,
      },
      fall: {
        imageSrc: "./src/img/samuraiMack/Fall.png",
        framesMax: 2,
      },
      attack1: {
        imageSrc: "./src/img/samuraiMack/Attack1.png",
        framesMax: 6,
      },
      takeHit: {
        imageSrc: "./src/img/samuraiMack/Take Hit - white silhouette.png",
        framesMax: 4,
      },
      Death: {
        imageSrc: "./src/img/samuraiMack/Death.png",
        framesMax: 6,
      },
    },

    attackBox: {
      offset: {
        x: 40,
        y: 50,
      },
      width: 160,
      height: 50,
    },
  });
}

/* ------------------------------ enemy object ------------------------------ */

let enemy;

if (Thunder) {
  enemy = new Fighters({
    position: {
      x: 400,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 10,
    },
    color: "blue",
    offset: {
      x: -50,
      y: 0,
    },

    imageSrc: "./src/img/kenji/Idle.png",
    framesMax: 4,
    scale: 2.5,

    offset: {
      x: 215,
      y: 171,
    },

    sprites: {
      idle: {
        imageSrc: "./src/img/kenji/Idle.png",
        framesMax: 4,
      },
      run: {
        imageSrc: "./src/img/kenji/Run.png",
        framesMax: 8,
      },
      runRight: {
        imageSrc: "./src/img/kenji/KRun-Right.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./src/img/kenji/jump.png",
        framesMax: 2,
      },
      fall: {
        imageSrc: "./src/img/kenji/Fall.png",
        framesMax: 2,
      },
      attack1: {
        imageSrc: "./src/img/kenji/Attack1.png",
        framesMax: 4,
      },
      takeHit: {
        imageSrc: "./src/img/kenji/Take hit.png",
        framesMax: 3,
      },
      Death: {
        imageSrc: "./src/img/kenji/Death.png",
        framesMax: 7,
      },
    },

    attackBox: {
      offset: {
        x: -140,
        y: 50,
      },
      width: 170,
      height: 50,
    },
  });
}

if (Luna) {
  enemy = new Fighters({
    position: {
      x: 400,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 10,
    },
    color: "blue",

    imageSrc: "./src/img/enemySecond/Idle-Sheet.png",
    framesMax: 4,
    scale: 2.8,
    offset: {
      x: 50,
      y: 26,
    },

    sprites: {
      idle: {
        imageSrc: "./src/img/enemySecond/Idle-Sheet.png",
        framesMax: 4,
      },
      //  idleRight: {
      //    imageSrc: "./src/img/enemySecond/Idle-Sheet-Right.png",
      //    framesMax: 4,
      //  },
      run: {
        imageSrc: "./src/img/enemySecond/Run-Sheet.png",
        framesMax: 8,
      },
      runRight: {
        imageSrc: "./src/img/enemySecond/Run-Sheet-Right.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./src/img/enemySecond/Jump-Start-Sheet.png",
        framesMax: 4,
      },
      fall: {
        imageSrc: "./src/img/enemySecond/Jump-End-Sheet.png",
        framesMax: 3,
      },
      attack1: {
        imageSrc: "./src/img/enemySecond/Attack-01-Sheet.png",
        framesMax: 8,
      },
      takeHit: {
        imageSrc: "./src/img/enemySecond/Jump-End-Sheet.png",
        framesMax: 3,
      },
      Death: {
        imageSrc: "./src/img/enemySecond/Dead-Sheet.png",
        framesMax: 4,
      },
      comboAttack: {
        imageSrc: "./src/img/enemySecond/Special_moves.png",
        framesMax: 2,
      },
    },

    attackBox: {
      offset: {
        x: -45,
        y: 50,
      },
      width: 110,
      height: 50,
    },
  });
}

/* ------------------------ calling decrease Timer fn ----------------------- */
var interval = setInterval(() => {
  DecreaseTimer();
}, 1000);

/* --------------------------- animastionLoop here -------------------------- */

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // calling update by FPS
  background.update();
  shop.update();
  player.update();
  enemy.update();

  /* -------------------------- Player movement here -------------------------- */
  player.velocity.x = 0;
  if (keys.d.pressed && player.position.x <= 974) {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -5;
    player.switchSprite("runLeft");
  } else {
    player.switchSprite("idle");
  }

  // player jump back to position(jump)
  if (keys.w.pressed && player.position.y >= 0) {
    if (player.position.y - player.velocity.y >= 0) {
      player.velocity.y = -14;
      player.switchSprite("jump");
    }
  } else if (
    player.velocity.y > 0 &&
    player.position.y < canvas.height - player.height
  ) {
    player.switchSprite("fall");
  }

  /* ------------------------- enemy movement here ------------------------- */

  enemy.velocity.x = 0;
  if (keys.ArrowRight.pressed && enemy.position.x <= 974) {
    enemy.velocity.x = 7;
    enemy.switchSprite("runRight");
  } else if (keys.ArrowLeft.pressed && enemy.position.x >= 0) {
    enemy.velocity.x = -7;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  //  enemy jumpbacks to position(jump)
  if (keys.ArrowUp.pressed && enemy.position.y >= 0) {
    if (enemy.position.y - enemy.velocity.y >= 0) {
      enemy.velocity.y = -14;
      enemy.switchSprite("jump");
    }
  } else if (
    enemy.velocity.y > 0 &&
    enemy.position.y < canvas.height - enemy.height
  ) {
    enemy.switchSprite("fall");
  }

  /* ------------------------ detect collision by hero ------------------------ */

  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit();
    player.isAttacking = false;

    if (enemy.health > 40) {
      document.querySelector("#enemyHealth").style.width = enemy.health + "%";
    } else {
      document.querySelector("#enemyHealth").style.width = enemy.health + "%";
      document.querySelector("#enemyHealth").style.background = "red";
    }
  }

  // if player misses enemy
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  /* -------------------------- enemy attacking score ------------------------- */

  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    /* ------------------------ detect co
      llision by enemy ----------------------- */
    player.takeHit();
    enemy.isAttacking = false;

    // player.health -= 10;
    if (player.health > 40) {
      document.querySelector("#playerHealth").style.width = player.health + "%";

      console.log("attack my enemy");
    } else {
      document.querySelector("#playerHealth").style.width = player.health + "%";
      document.querySelector("#playerHealth").style.background = "red";
    }
  }

  // if enemy misses player
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  /* ------------------ player and enemy defeat before timing ----------------- */
  if (player.health <= 0 || enemy.health <= 0) {
    FinalWinner({ player, enemy });
  }
}
animate();

/* ------------------- mover characters with EventListener ------------------ */
let isVPressed = false;
let isControlPressed = false;
window.addEventListener("keydown", (event) => {
  console.log(event);
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

      case "v":
        isVPressed = true;
        break;

      case " ":
        if (isVPressed) {
          // Space + Alt combo
          player.specialAttack();
          console.log("this is v + space");
        } else {
          player.attack();
        }
        break;
    }
  }
  console.log(event.key);
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
      
      case "Control":
        isControlPressed = true;
        break;
      
      case "ArrowDown":
        if (isControlPressed) {
          // Space + Alt combo
          enemy.specialAttack();
          console.log("this is control + arrowdown");
        } else {
          enemy.attack();
        }
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

      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        // count = true;

        // if (count) {
        //   if (enemy.image !== enemy.sprites.idleRight.image) {
        //     enemy.image = enemy.sprites.idleRight.image;
        //     enemy.framesCurrent = 0;
        //     enemy.framesMax = enemy.sprites.idleRight.framesMax;
        //   }
        // }
        break;

      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
      case "ArrowUp":
        keys.ArrowUp.pressed = false;
        break;
      case "v":
        isVPressed = false;
        break;
      case "Control":
        isControlPressed = false;
        break;
    }

    console.log(event.key);
  });
}
