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
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});

const shop = new Sprite({
  position: {
    x: 600,
    y: 134,
  },
  imageSrc: "./img/shop.png",
  scale: 2.75,
  framesMax: 6,
});

/* - creating player and enemy objects and passing arguments to constructor - */
const player = new Fighters({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  imageSrc: "./img/samuraiMack/Idle.png",
  framesMax: 8,
  scale: 2.5,

  offset: {
    x: 215,
    y: 157,
  },

  sprites: {
    idle: {
      imageSrc: "./img/samuraiMack/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./img/samuraiMack/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/samuraiMack/jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/samuraiMack/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/samuraiMack/Attack1.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./img/samuraiMack/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    Death: {
      imageSrc: "./img/samuraiMack/Death.png",
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

/* ------------------------------ enemy object ------------------------------ */
const enemy = new Fighters({
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

  imageSrc: "./img/kenji/Idle.png",
  framesMax: 4,
  scale: 2.5,

  offset: {
    x: 215,
    y: 171,
  },

  sprites: {
    idle: {
      imageSrc: "./img/kenji/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./img/kenji/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/kenji/jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/kenji/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/kenji/Attack1.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./img/kenji/Take hit.png",
      framesMax: 3,
    },
    Death: {
      imageSrc: "./img/kenji/Death.png",
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
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  /* ------------------------- enemy movement here ------------------------- */
  enemy.velocity.x = 0;
  if (keys.ArrowRight.pressed && enemy.position.x <= 974) {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else if (keys.ArrowLeft.pressed && enemy.position.x >= 0) {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
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

if (!player.dead) {
  window.addEventListener("keydown", (event) => {
    console.log(event);
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
        player.velocity.y = -20;
        break;
      case " ":
        player.attack();
        break;

      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        console.log(event.key);
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        console.log(event.key);
        break;
      case "ArrowUp":
        enemy.velocity.y = -20;

        break;
      case "ArrowDown":
        enemy.attack();
        break;
    }
    console.log(event.key);
  });
}


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
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
      case "ArrowUp":
        keys.ArrowUp.pressed = false;
        break;
    }

    console.log(event.key);
  });
}