class FightersAction extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
    playerId,
  }) {
    super({ position, imageSrc, scale, framesMax, offset });

    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.playerId = playerId;
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.sprites = sprites;
    this.dead = false;
    this.isEnemyControlPressed;
    this.specialAttackCounter = 0;

    /* ------------------------------ attacking box ----------------------------- */

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };

    /* -------------------- creating(Preloading images ) image animation for FightersAction here ------------------- */
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }



  /* ----------------------- updating all controls here ----------------------- */
  update() {
    this.draw();

    if (!this.dead) {
      this.animateFrame();
    }

    // attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width,this.attackBox.height)

    /* -------------- this is where updating position of the sprite ------------- */
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    /* ---------------------------- gravity function ---------------------------- */
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  /* ----------------------------- computer logics ---------------------------- */

  enemyAI(enemy, player) {
    setTimeout(() => {
    // console.log('kfjdsjknjasnf')
    if (!player.dead && !enemy.dead) {
      const distanceToPlayer = player.position.x - enemy.position.x;
      // console.log(distanceToPlayer);
      // Adjust velocity to move towards the player
      if (distanceToPlayer > 0) {
        enemy.switchSprite("runRight");
        sound.enemyrun("on");
        enemy.velocity.x = 2;
      } else if (distanceToPlayer < 0) {
        sound.enemyrun("on");
        enemy.velocity.x = -2;
        enemy.switchSprite("run");
      } else {
        // If the enemy is already at the player's position, stop moving
        enemy.switchSprite("idle");
        enemy.velocity.x = 0;
      }
    }
    }, 300);

    const distanceToPlayer = Math.abs(enemy.position.x - player.position.x);
    // Check if the player is within attack range
    if (distanceToPlayer < 120) {
      // Randomly decide whether to perform a regular attack or a special attack
      const randomNum = Math.round(1 + Math.random() * 2);
      console.log(randomNum);
      // Use a timer to control the attack interval
      // console.log(!this.attackTimer);
      if (!this.attackTimer) {
        this.attackTimer = setInterval(() => {
          if (randomNum === 1 || randomNum === 2) {
            // for sound effects
            console.log("count" + defendCount);
            if (defendCount !== 3) {
              if (selectedEnemy == "Luna") {
                sound.luna();
              } else {
                sound.kanji();
              }
              enemy.attack();
              keys.Insert.pressed = false;
            }
            // for defends
            else if (defendCount === 3) {
              keys.Insert.pressed = true;
              enemy.switchSprite("Defend");
            }
            // Regular attack
          } else if (randomNum === 3) {
            // Special attack
            enemy.SpecialAttack();
          }
        }, 450);
      }
    } else {
      // Clear the attack timer when the player is out of range
      clearInterval(this.attackTimer);
      this.attackTimer = null;
    }
  }

  /* ---------- hit space or arrowdown it call attack from addEventListner ---------- */
  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;
  }

  SpecialAttack() {
    if (this.specialAttackCounter < 4) {
      if (this.playerId === 2) {
        sound.combo("lunacombo");
      } else {
        sound.combo("playercombo");
      }
      this.switchSprite("comboAttack");
      this.isAttacking = true;
      this.specialAttackCounter++;
      this.updateComboCountDisplay();
    }
  }

  updateComboCountDisplay() {
    let id = `player${this.playerId}ComboCount`;
    // console.log(id);
    const comboCountSpan = document.getElementById(id);
    comboCountSpan.innerHTML = ""; // Clear existing icons

    // Generate fire icons based on specialAttackCounter
    for (let i = 0; i < 4 - this.specialAttackCounter; i++) {
      const fireIcon = document.createElement("span");
      // console.log("i m gired fire icon");
      fireIcon.innerHTML = "🔥"; // Use any appropriate fire emoji
      comboCountSpan.appendChild(fireIcon);
    }
  }

  takeHit(damage) {
    this.health -= damage;
    console.log(this.health);

    if (this.health <= 0) {
      this.health = 0;
      this.switchSprite("Death");
      if (this.playerId === 1) {
        sound.Dead("player-dead");
      } else if (this.playerId === 2) {
        sound.Dead("enemy-dead");
      }
    } else {
      this.switchSprite("takeHit");
    }
  }

  /* ---------------------------- switch of sprite ---------------------------- */
  switchSprite(sprite) {
    if (this.image === this.sprites.Death.image) {
      if (this.framesCurrent === this.sprites.Death.framesMax - 1)
        this.dead = true;
      return;
    }

    //  if the fighter is currently playing the "attack1" animation and has not reached the last frame, the method exits without executing the rest of the sprite-switching logic
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return;

    // override when fighter gets hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;
    if (
      this.image === this.sprites.comboAttack.image &&
      this.framesCurrent < this.sprites.comboAttack.framesMax - 1
    )
      return;

    if (
      this.image === this.sprites.Defend.image &&
      this.framesCurrent < this.sprites.Defend.framesMax - 1
    )
      return;

    //  if (
    //    this.image === this.sprites.idle.image &&
    //    this.framesCurrent < this.sprites.idle.framesMax - 1
    //  )
    //    return;
    //  if (
    //    enemy.image === enemy.sprites.runRight.image &&
    //    enemy.framesCurrent < enemy.sprites.runRight.framesMax - 1
    //  )
    //    return;

    // if (
    //   this.image === this.sprites.run.image &&
    //   this.framesCurrent < this.sprites.run.framesMax - 1
    // )
    //   return;

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.idle.framesMax;
        }
        break;

      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.run.framesMax;
        }
        break;

      case "runRight":
        if (this.image !== this.sprites.runRight.image) {
          this.image = this.sprites.runRight.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.runRight.framesMax;
        }
        break;
      case "runLeft":
        if (this.image !== this.sprites.runLeft.image) {
          this.image = this.sprites.runLeft.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.runLeft.framesMax;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.jump.framesMax;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.fall.framesMax;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.attack1.framesMax;
        }
        break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.takeHit.framesMax;
        }
        break;
      case "Death":
        if (this.image !== this.sprites.Death.image) {
          this.image = this.sprites.Death.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.Death.framesMax;
        }
        break;
      case "comboAttack":
        if (this.image !== this.sprites.comboAttack.image) {
          this.image = this.sprites.comboAttack.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.comboAttack.framesMax;
        }
        break;

      case "Defend":
        console.log("Switching to Defend sprite!");
        if (this.image !== this.sprites.Defend.image) {
          this.image = this.sprites.Defend.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.Defend.framesMax;
        }

        break;
    }
  }
}


