// enemyAI.js

// function enemyAI(enemy, player) {
//   // Your AI logic goes here
//   // Analyze player position, move towards the player, and attack when close enough

//   // Example:
//   setInterval(() => {
//     if (!player.dead) {
//       // Analyze player position
//       const playerPosition = {
//         x: player.position.x,
//         y: player.position.y,
//       };
//       const distanceToPlayer = playerPosition.x - enemy.position.x;

//       // Move towards the player
//       if (distanceToPlayer > 0) {
//         enemy.velocity.x = 1; // Adjust the speed as needed
//         enemy.switchSprite("runRight");
//       } else if (distanceToPlayer < 0) {
//         enemy.velocity.x = -1; // Adjust the speed as needed
//         // enemy.switchSprite("runLeft"); // Assuming you have a runLeft sprite
//       } else {
//         // If the enemy is already at the player's position, stop moving
//         enemy.velocity.x = 0;
//       }

//       // Attack when close enough (you can adjust the distance)
//       const distanceToAttack = 100;
//       const distance = Math.abs(enemy.position.x - playerPosition.x);

//       if (distance < distanceToAttack) {
//         enemy.attack();
//       }
//     }
//   }, 300); // Adjust the interval based on your preference
// }

// Call the enemyAI function when the page loads
// document.addEventListener("DOMContentLoaded", function () {
//   // Assuming you have 'enemy' and 'player' objects already defined
  
// });
