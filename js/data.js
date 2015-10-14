/***************** GAME DATA DECLARATION ***************/
var gameCounter = 0; //counter used for game script
var currentRate= 0; // current research rate that adds on to research PT
var researchPt = 0; // research point use to purchase new 
var currentCharPos = 0;
var currentBG = 0;

/***************** LOCATION DATA DECLARATION ***************/
var computer = {
  name: "computer",
  cost: 0,
  researchRate: 0.17,
  owned: 1,
  src: "images/background/bg03a4.jpg",
  append: false,
  imgPos: [0, 0, 1024, 576, 0, 0]
};
var lab = {
  name: "Quatum Lab",
  cost: 10,
  researchRate: 0.34,
  owned: 0,
  src: "images/background/lab3.jpg",
  append: false,
  imgPos: [0, 0, 4000, 2400, 0, 0]
};


/***************** TECHNOLOGY DATA DECLARATION ***************/
var tech1 = {
  name: "tech1 testing",
  description: "Mauris pretium nibh ut urna iaculis, non blandit nulla lobortis. Nunc vel ipsum massa. Donec ullamcorper non risus sed ultrices.",
  src: "images/technology/tech000.png",
  cost: 10,
  isKnown: false
};
/***************** CHARACTER DATA DECLARATION ***************/
var you = {
  dialogCounter: 0,
  script: [
          "You: That was a weird conversation.",
          "You: Could he really be telling the truth?",
          "You: For now, I'll follow his advice to do some research on my own.",
          "You: I was just about to give up hope on anyone knowing who Tipler or Kerr was on this worldline.",
          "You: The basics for time travel start at CERN in about a year and end in 2034 with the first 'time machine' built by GE.",
          "You: Too bad you are not a scientist or I'd show my time machine to you.",
          "You: If you still want to know about time travel, then why don't you start by learning the basics of time travel online first?",
          "(Click on computer to start doing research on time travel)"
          ],
  src: "images/faces.png",
  imgPos: [255, 0, 100, 121, 0]
};

var john = {
  dialogCounter: 0,
  script: [
          "Slack Message: Hi, my name is John Titor. Do you have a min?",
          "John: I saw your post on the Time Travel Portal Forum which led me to you.",
          "John: This may come as a shock to you, but I am a TIME TRAVELER.",
          "John: I was just about to give up hope on anyone knowing who Tipler or Kerr was on this worldline.",
          "John: The basics for time travel start at CERN in about a year and end in 2034 with the first 'time machine' built by GE.",
          "John: Too bad you are not a scientist or I'd show my time machine to you.",
          "John: If you still want to know about time travel, then why don't you start by learning the basics of time travel online first?",
          "(Click on computer to start doing research on time travel)"
          ],
  src: "images/faces.png",
  imgPos: [10, 0, 100, 121, 0]
};

var amelia = {
  dialogCounter: 0,
  script: [
          "Amelia: THAT WAS AWESOME!!!!!",
          "Amelia: Oh, sorry to spy on you but I overheard everything...",
          "Amelia: Do you think John's a REAL time traveler?",
          "Amelia: Tell you what I'll help you doing research too.",
          "Amelia: I am not as smart as you but I will do my best!!",
          "(Amelia will increase your research point every couple seconds.)"
          ],
  src: "images/faces.png",
  imgPos: [508, 0, 100, 123, 0]
};


var currentBG = computer;
var currentChar = john;
/***************** IMAGE ASSETS LOADING *****************/
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = currentBG.src;

// char image
var charReady = false;
var charImage = new Image();
charImage.onload = function () {
  charReady = false;
};
charImage.src = "images/faces.png";



// // icon image
// var researchReady = false;
// var researchImage = new Image();
// researchImage.onload = function () {
//   researchReady = true;
// };
// researchImage.src = "images/icons.png";