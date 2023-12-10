let player;
if (HighForest) {
  player = new Fighters({
    position: {
      x: 0,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 10,
    },
    imageSrc: "./img/HighForest/Idle-Sheet.png",
    framesMax: 4,
    scale: 2.5,

    offset: {
      x: 50,
      y: 10,
    },

    sprites: {
      idle: {
        imageSrc: "./img/HighForest/Idle-Sheet.png",
        framesMax: 4,
      },
      run: {
        imageSrc: "./img/HighForest/Run-Sheet.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./img/HighForest/Jump-Start-Sheet.png",
        framesMax: 4,
      },
      fall: {
        imageSrc: "./img/HighForest/Jump-End-Sheet.png",
        framesMax: 3,
      },
      attack1: {
        imageSrc: "./img/HighForest/Attack-01-Sheet.png",
        framesMax: 8,
      },
      takeHit: {
        imageSrc: "./img/HighForest/Jump-End-Sheet.png",
        framesMax: 3,
      },
      Death: {
        imageSrc: "./img/HighForest/Dead-Sheet.png",
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

if (samuraiMack) {
  player = new Fighters({
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
      y: 160,
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
}




let enemy;

if (enemy1) {
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
}

if (enemy2) {
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

    imageSrc: "./img/enemySecond/Idle-Sheet.png",
    framesMax: 4,
    scale: 2.8,
    offset: {
      x: 50,
      y: 26,
    },

    sprites: {
      idle: {
        imageSrc: "./img/enemySecond/Idle-Sheet.png",
        framesMax: 4,
      },
      run: {
        imageSrc: "./img/enemySecond/Run-Sheet.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./img/enemySecond/Jump-Start-Sheet.png",
        framesMax: 4,
      },
      fall: {
        imageSrc: "./img/enemySecond/Jump-End-Sheet.png",
        framesMax: 3,
      },
      attack1: {
        imageSrc: "./img/enemySecond/Attack-01-Sheet.png",
        framesMax: 8,
      },
      takeHit: {
        imageSrc: "./img/enemySecond/Jump-End-Sheet.png",
        framesMax: 3,
      },
      Death: {
        imageSrc: "./img/enemySecond/Dead-Sheet.png",
        framesMax: 4,
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