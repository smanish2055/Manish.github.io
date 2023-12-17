class audio {
  constructor() {
    // Define your audio elements here
    this.smuraimackAudio = new Audio("./src/audio/samurai-sward.mp3");
    this.smuraimackAudio.preload = "auto";
    this.lunaAudio = new Audio("./src/audio/Luna.mp3");
    this.lunaAudio.preload = "auto";
    this.kanjiAudio = new Audio("./src/audio/kenzi.mp3");
    this.kanjiAudio.preload = "auto";
    this.BlazeAudio = new Audio("./src/audio/Blaze.mp3");
    this.BlazeAudio.preload = "auto";

    this.herorunning = new Audio("./src/audio/herorunning.mp3");
    this.enemyrunning = new Audio("./src/audio/enemyrunning.mp3");
    this.lunajump = new Audio("./src/audio/luna-jump.mp3");
    this.kenjijump = new Audio("./src/audio/kenji-jump.mp3");
    this.samuraijump = new Audio("./src/audio/samurai-jump.mp3");
    this.blazejump = new Audio("./src/audio/blaze-jump.mp3");
    this.playerdead = new Audio("./src/audio/player-dead.mp3");
    this.enemydead = new Audio("./src/audio/enemy-dead.mp3");
    this.gamedraw = new Audio("./src/audio/game-draw.mp3");
    this.lunacombo = new Audio("./src/audio/enemy-combofire.mp3");
    this.playercombo = new Audio("./src/audio/player-combo.mp3");
    this.background = new Audio("./src/audio/main-background.mp3");
    this.shield = new Audio("./src/audio/player-shield.mp3");
    this.auto = new Audio("./src/audio/hoverSound.mp3");
  }

  backgroundsound() {
    this.background.play();
  }

  jump(on) {
    switch (on) {
      case "luna":
        this.lunajump.play();
        break;
      case "thunder":
        this.kenjijump.play();
        break;
      case "samurai":
        this.samuraijump.play();
        break;
      case "blaze":
        console.log("blaze");
        this.blazejump.play();
        break;
    }
  }

  // sward attack
  smuraimack(off) {
    // Play the smuraimack sound
    if (off === "off") {
      this.smuraimackAudio.pause();
    } else {
      this.smuraimackAudio.play();
    }
  }

  luna(off) {
    // Play the luna sound
    if (off === "off") {
      this.lunaAudio.pause();
    } else {
      this.lunaAudio.play();
    }

    console.log("luna audio");
  }

  kanji(off) {
    if (off === "off") {
      this.kanjiAudio.pause();
    } else {
      this.kanjiAudio.play();
    }
  }

  Blaze(off) {
    if (off === "off") {
      this.BlazeAudio.pause();
    } else {
      this.BlazeAudio.play();
    }
  }

  // running
  herorun(on) {
    if (on === "on") {
      this.herorunning.play();
    } else {
      this.herorunning.pause();
    }
  }
  enemyrun(on) {
    if (on === "on") {
      this.enemyrunning.play();
    } else {
      this.enemyrunning.pause();
    }
  }

  Dead(on) {
    switch (on) {
      case "player-dead":
        console.log("player-dead");
        this.playerdead.play();
        break;
      case "enemy-dead":
        this.enemydead.play();
        break;
      case "game-draw":
        this.gamedraw.play();
        break;
    }
  }

  combo(on) {
    switch (on) {
      case "lunacombo":
        this.lunacombo.play();
        break;
      case "playercombo":
        this.playercombo.play();
        break;
    }
  }

  shieldDefend() {
    this.shield.play();
  }

  autoenemy() {
    this.auto.play();
  }
}

const sound = new audio();

sound.backgroundsound();
// setTimeout(() => {

// }, 1000);
