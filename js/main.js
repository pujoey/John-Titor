

// testing file loading
console.log("***** MAIN.JS LOADED!!! ***")

/***************** VARIABLE DECLARATION ***************/
var gameArea = document.getElementById('gameArea'); //DOM div#gameArea
var widthToHeight = 4 / 3;
var newWidth = window.innerWidth;
var newHeight = window.innerHeight;
var newWidthToHeight = newWidth / newHeight;



// **************** ADJUSTING CSS PER WINDOW WIDTH/HEIGHT **************
if (newWidthToHeight > widthToHeight) {
  // window width is too wide relative to desired game width
  newWidth = newHeight * widthToHeight;
  gameArea.style.height = newHeight + 'px';
  gameArea.style.width = newWidth + 'px';
} else { // window height is too high relative to desired game height
  newHeight = newWidth / widthToHeight;
  gameArea.style.width = newWidth + 'px';
  gameArea.style.height = newHeight + 'px';
}

// apply negative margin on top and left to center game area
gameArea.style.marginTop = (-newHeight / 2) + 'px'; 
gameArea.style.marginLeft = (-newWidth / 2) + 'px';
// adjust fontsize based on width
gameArea.style.fontSize = (newWidth / 400) + 'em';

var gameCanvas = document.getElementById('gameCanvas');
gameCanvas.width = newWidth;
gameCanvas.height = newHeight;

function resizeGame() {
    var gameArea = document.getElementById('gameArea');
    var widthToHeight = 4 / 3;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }
    
    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';
    
    var gameCanvas = document.getElementById('gameCanvas');
    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;
}

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);

var ctx = gameCanvas.getContext("2d");


/*************** MAIN MENU TESTING ************/
function menu() {
// ctx.font = newWidth / 16+ "px" + " Arial";
// ctx.fillStyle = "#FFF";
// ctx.fillText("Project 1: The Game",newWidth / 8, newHeight / 6);


}


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
  speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
  hero.x = gameCanvas.width / 2;
  hero.y = gameCanvas.height / 2;

  // Throw the monster somewhere on the screen randomly
  monster.x = 32 + (Math.random() * (gameCanvas.width - 64));
  monster.y = 32 + (Math.random() * (gameCanvas.height - 64));
};

// Update game objects
var update = function (modifier) {
  if (38 in keysDown) { // Player holding up
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) { // Player holding down
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) { // Player holding left
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) { // Player holding right
    hero.x += hero.speed * modifier;
  }

  // Are they touching?
  if (
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset();
  }
};

// Draw everything
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  // Score
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

// // Cross-browser support for requestAnimationFrame
// var w = window;
// requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
// menu();
main();