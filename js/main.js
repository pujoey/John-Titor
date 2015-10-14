// testing file loading
console.log("***** MAIN.JS LOADED!!! ***")

/***************** GAME RENDERING VARIABLE DECLARATION ***************/
var gameArea = document.getElementById('gameArea'); //DOM div#gameArea
var widthToHeight = 10 / 6;
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
gameArea.style.fontSize = (newWidth / 500) + 'em';

var gameCanvas = document.getElementById('gameCanvas');
gameCanvas.width = newWidth;
gameCanvas.height = newHeight;


// resize function respond to windows event "resize"
function resizeGame() {
    var gameArea = document.getElementById('gameArea');
    var widthToHeight = 10 / 6;
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


// Draw everything
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, currentBG.imgPos[0], currentBG.imgPos[1], currentBG.imgPos[2], currentBG.imgPos[3], currentBG.imgPos[4], currentBG.imgPos[5], newWidth, newHeight);
  }

  if (charReady) {

      ctx.drawImage(charImage, currentChar.imgPos[0], 
        currentChar.imgPos[1], currentChar.imgPos[2], currentChar.imgPos[3], currentChar.imgPos[4], newHeight-242, 200, 242);
  }
  
  // Display research point
  ctx.fillStyle = "rgb(250, 250, 250)"; //white text
  ctx.font = "24px Helvetica"; //font style
  ctx.textAlign = "left"; //alignment
  ctx.textBaseline = "top"; 
  ctx.fillText("Research Point: " + parseFloat(researchPt).toFixed(3), 32, 32);

};

// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  render();
  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

// Let's play this game!
var then = Date.now();
main();