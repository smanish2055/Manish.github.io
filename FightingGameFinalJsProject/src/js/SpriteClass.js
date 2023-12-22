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

      // X-coordinate in sprite image from which to start drawing
      this.framesCurrent * (this.image.width / this.framesMax),
      0,

      //Specifies the width of each frame
      this.image.width / this.framesMax,
      this.image.height,

      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      
      // Specifies the width and height of the drawn sprite 
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
      // here scale is working in each image of sprite height and width increament
    );
  }

  /* ----------------------- / animation is performing ---------------------------------------- */
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

  /* --------------------------------- update --------------------------------------------------- */
  update() {
    this.draw();
    this.animateFrame();
  }
}
