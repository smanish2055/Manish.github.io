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
    enemy.velocity.x = -7;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }
  if (enemy.velocity.y < 0 && enemy.position.y <= 0) {
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
