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
  f: {
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
  Insert: {
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
      comboAttack: {
        imageSrc: "./src/img/HighForest/combo.png",
        framesMax: 8,
      },
      Defend: {
        imageSrc: "./src/img/HighForest/combo.png",
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
        imageSrc: "./src/img/samuraiMack/Jump.png",
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
      comboAttack: {
        imageSrc: "./src/img/samuraiMack/combo.png",
        framesMax: 6,
      },
      Defend: {
        imageSrc: "./src/img/samuraiMack/combo.png",
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
        imageSrc: "./src/img/kenji/Jump.png",
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
      comboAttack: {
        imageSrc: "./src/img/kenji/combo.png",
        framesMax: 4,
      },
      Defend: {
        imageSrc: "./src/img/kenji/Defend.png",
        framesMax: 4,
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

/* -------------------------- enemy another object -------------------------- */
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
        imageSrc: "./src/img/enemySecond/Run_Right.png",
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
        framesMax: 8,
      },
      Defend: {
        imageSrc: "./src/img/enemySecond/Special_moves.png",
        framesMax: 8,
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
