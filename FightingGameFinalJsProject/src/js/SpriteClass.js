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
    this.isPlayerControlPressed;
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

  /* ----------------------- / animation is performing ----------------------- */
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

// export default Sprite;