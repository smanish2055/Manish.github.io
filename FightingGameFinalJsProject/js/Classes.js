class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    // this.image.height = this.image.height + 100;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framePassed = 0;
    this.frameHold = 10;
    this.offset = offset;
  }
  draw() {
    ctx.drawImage(
      this.image,
      //   crop sprite  image
      // here framesCurrent is setting postition of sprite image by increasing frames cuttent postion
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,

      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  /* ----------------------- /here animation is perform  ----------------------- */
  animateFrame() {
    this.framePassed++;
    if (this.framePassed % this.frameHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  /* --------------------------------- update --------------------------------- */
  update() {
    this.draw();
    this.animateFrame();
  }
}

// ----------------------------------------------------------------

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

  takeHit() {
    // this.switchSprite("takeHit");
    this.health -= 10;
      if (this.health <= 0) {
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
      return
      
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
    }
  }
}
