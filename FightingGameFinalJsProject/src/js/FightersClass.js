class Fighters extends Sprite {
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
  }) {
    super({ position, imageSrc, scale, framesMax, offset });

    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;

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
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.sprites = sprites;
    this.dead = false;
    this.isEnemyControlPressed;
    this.specialAttackCounter=0;

    /* -------------------- creating image animation for fighters here ------------------- */
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  // draw() {
  //   ctx.fillStyle = this.color;
  //   ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

  //   // if isAttacking is true then it show attacking box
  //   if (this.isAttacking) {
  //     ctx.fillStyle = "green";
  //     ctx.fillRect(
  //       this.attackBox.position.x,
  //       this.attackBox.position.y,
  //       this.attackBox.width,
  //       this.attackBox.height
  //     );
  //   }
  // }

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

  /* ---------- when i hit space or arrowdown it call attack from addEventListner ---------- */
  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;
  }

  
  SpecialAttack() {
     if (this.specialAttackCounter < 4) {
    this.switchSprite("comboAttack");
       this.isAttacking = true;
       this.specialAttackCounter++;
     }
  }

  defend() {
    this.switchSprite("Defend");
    // this.isAttacking = true;
  }

  
  takeHit(damage) {
    this.health -= damage;
    console.log(this.health);

    if (this.health <= 0) {
      this.health = 0;
      this.switchSprite("Death");
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
    // overriding all other animations with the attack animation
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
    
    //  if (
    //    this.image === this.sprites.Defend.image &&
    //    this.framesCurrent < this.sprites.Defend.framesMax - 1
    //  )
    //    return;
    //  if (
    //    this.image === this.sprites.Defend?.image &&
    //    this.framesCurrent < (this.sprites.Defend?.framesMax ?? 0) - 1
    //  ) {
    //    return; // Exit the method if already in the "Defend" state and animation frames are not at the maximum.
    //  }

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
        if (this.image !== this.sprites.Defend.image) {
          this.image = this.sprites.Defend.image;
          this.framesCurrent = 0;
          this.framesMax = this.sprites.Defend.framesMax;
        }
        break;
    }
  }
}


// Export the Fighters class
// export default Fighters;