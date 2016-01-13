/*
 data.js contains game global data variables,
 location data variables, technology data variables,
 character data variables, and image asset loading
*/

/***************** GAME GLOBAL DATA DECLARATION ***************/
var gameCounter = 0; //counter used for game script
var currentRate= 0; // current research rate that adds on to research PT
var researchPt = 0; // research point use to purchase new
var currentBG = 0;

/***************** LOCATION DATA DECLARATION ***************/
var computer = {
  name: "computer",
  cost: 0,
  researchRate: 0.017,
  owned: 0,
  icon: "./images/icons/computer.png",
  src: "./images/background/bg03a4.jpg",
  append: false,
  imgPos: [0, 0, 1024, 576, 0, 0]
};
var lab = {
  name: "lab",
  cost: 30,
  researchRate: 1,
  owned: 0,
  icon: "./images/icons/lab.png",
  src: "./images/background/lab3.jpg",
  append: false,
  imgPos: [0, 0, 4000, 2400, 0, 0]
};
var cern = {
  name: "CERN",
  cost: 100,
  researchRate: 30,
  owned: 0,
  icon: "./images/icons/cern.png",
  src: "./images/background/cern.jpg",
  append: false,
  imgPos: [0, 0, 1600, 823, 0, 0],
};
var timeMachine = {
  name: "timeMachine",
  cost: 1000,
  researchRate: 200,
  owned: 0,
  icon: "./images/icons/timeMachineIcon.png",
  src: "./images/background/timemachine.jpg",
  append: false,
  imgPos: [0, 0, 1920, 1080, 0, 0],
  eventCounter: 999
};


/***************** TECHNOLOGY DATA DECLARATION ***************/
var tech1 = {
  name: "Information Networks",
  id: "tech1",
  description: "What’s more important, the data or the jazz? \
  Sure, sure, ‘Information should be free’ and all that - \
  but anyone can set information free. The jazz is in how you do it, \
  what you do it to, and in almost getting caught without getting caught.\
   The data is 1’s and 0’s. Life is the jazz. \
  <br> -- Datatech Sinder Roze , 'Infobop'",
  icon: "./images/technology/tech002.png",
  src: "",
  cost: 5,
  track: "Time Travel",
  researchRate: 0.005,
  isResearched: false,
  append: false,
  eventCounter: 20,
  voice: "./voices/angels.mp3"
};

var tech2 = {
  name: "Advanced Subatomic Theory",
  id: "tech2",
  description: "The substructure of the universe regresses infinitely \
  towards smaller and smaller components. Behind atoms we find electrons, \
  and behind electrons, quarks. Each layer unraveled reveals new secrets, \
  but also new mysteries. \
  <br> -- Academician Prokhor Zakharov , 'For I Have Tasted the Fruit'",
  icon: "./images/technology/tech012.png",
  src: "",
  cost: 20,
  track: "Time Travel",
  researchRate: 0.012,
  isResearched: false,
  append: false,
  eventCounter: 30, // no event
  voice: "./voices/univ.mp3"
};

var tech3 = {
  name: "Social Psych",
  id: "tech3",
  description: "If you can discover a better way of life than office-holding \
  for your future rulers, a well-governed city becomes a possibility. \
    For only in such a state will those rule who are truly rich, \
  not in gold, but in the wealth that makes happiness—a good and wise life. \
  <br> -- Plato , 'The Republic'",
  icon: "./images/technology/tech004.png",
  src: "",
  cost: 40,
  track: "Hoax",
  researchRate: 0.012,
  isResearched: false,
  append: false,
  eventCounter: 35, // initScript(35, ...
  voice: "./voices/tech4.mp3"
};

var tech4 = {
  name: "Applied Physics",
  id: "tech4",
  description: "Scientific theories are judged by the coherence they \
  lend to our natural experience and the simplicity with which they do so. \
  The grand principle of the heavens balances on the razor's edge of truth. \
  <br> -- Comissioner Pravin Lal , 'A History of Science'",
  icon: "./images/technology/tech003.png",
  src: "",
  cost: 50,
  track: "Time Travel",
  researchRate: 0.012,
  isResearched: false,
  append: false,
  eventCounter: 40,
  voice: "./voices/tech3.mp3"
};

var tech5 = {
  name: "Intellectual Integrity",
  id: "tech5",
  description: "Man's unfailing capacity to believe what he prefers to be \
  true rather than what the evidence shows to be likely and possible has \
  always astounded me. We long for a caring Universe which will save us \
  from our childish mistakes, and in the face of mountains of evidence to \
  the contrary we will pin all our hopes on the slimmest of doubts. \
  God has not been proven not to exist, therefore he must exist.\
  <br> -- Academician Prokhor Zakharov , 'For I Have Tasted the Fruit'",
  icon: "./images/technology/proj004.png",
  src: "",
  cost: 50,
  track: "Hoax",
  researchRate: 0.012,
  isResearched: false,
  append: false,
  eventCounter: 40,
  voice: "./voices/tech37.mp3"
};

var tech6 = {
  name: "Secrets of the Human Brain",
  id: "tech6",
  description: "There are only two ways in which we can account for a \
  necessary agreement of experience with the concepts of its objects: \
  either experience makes these concepts possible or these concepts make experience possible.\
  <br> -- Immanuel Kant , 'Critique of Pure Reason'",
  icon: "./images/technology/proj009.png",
  src: "",
  cost: 60,
  track: "Hoax",
  researchRate: 0.012,
  isResearched: false,
  append: false,
  eventCounter: 40,
  voice: "./voices/tech48.mp3"
};

var tech7 = {
  name: "Ethical Calculus",
  id: "tech7",
  description: "Some vices miss what is right because they are deficient, \
  others because they are excessive, in feelings or in actions, \
  while virtue finds and chooses the mean.\
  <br> -- Aristotle , 'Nichomachean Ethics'",
  icon: "./images/technology/proj024.png",
  src: "",
  cost: 70,
  track: "Hoax",
  researchRate: 0.012,
  isResearched: false,
  append: false,
  eventCounter: 40,
  voice: "./voices/tech44.mp3"
};

/***************** CHARACTER DATA DECLARATION ***************/
var you = {
  dialogCounter: 0,
  script: [
          "You: That was a weird conversation.",
          "You: Could he really be telling the truth, or is this just an eloborate HOAX?",
          "You: I guess I will follow his advice to do some research on my own for now...",
          "You: John, wait! Don't you think it's time to let me in on the secret of time travel?",
          "You: ...OR is this all a big HOAX?"
          ],
  src: "./images/faces.png",
  imgPos: [255, 0, 100, 121, 0],
};

var john = {
  dialogCounter: 0,
  script: [
          "Slack Message: Hi, my name is John Titor. Do you have a min?",
          "John: I saw your post on the Time Travel Portal Forum which led me to you.",
          "John: This may come as a shock to you, but I am a TIME TRAVELER.",
          "John: I was just about to give up hope on anyone knowing who Tipler or Kerr was on this worldline.",
          "John: The basics for time travel start at CERN in about a year and end in 2034 with the first 'time machine' built by GE.",
          "John: Too bad you know nothing about time travel or I'd teach you how to build a time machine.",
          "John: If you still want to know about time travel, then why don't you start by learning the basics of time travel first?",
          "(Click on computer to start doing research)",
          "John: Congratulation, I've noticed your effort on researching 'Information Networks'.",
          "John: Being able to access different infomation networks for recent research on algorithms \
          for analyzing information...",
          "John: ... and models that capture their basic propertie, sites such as IEEE, Quora, or Stackoverflow \
          will be critical to your research on time travel.",
          "John: ...Fine, here's a list for basic systems for a gravity distortion system that will allow time travel.",
          "John:  Magnetic housing units for dual microsignularities,  \
                  Electron injection manifold to alter mass and gravity of microsingularities.",
          "John:  Cooling and x-ray venting system, \
                  and lastly, gravity sensors (VGL system)",
          "John: Like I said, all in due time... Keep up the good work."
          ],
  src: "./images/faces.png",
  imgPos: [0, 0, 115 , 130, 0]
};

var amelia = {
  dialogCounter: 0,
  script: [
          "(Your sister Amelia, taps you on the back)",
          "Amelia: AWESOME SAUCE!!!!!",
          "Amelia: Oh, sorry to spy on you but I overheard everything...",
          "Amelia: Do you think John's a REAL time traveler?",
          "Amelia: Tell you what I'll help you do some research too.",
          "Amelia: I am not as smart as you but I will do my best!!",
          "( With each click on the computer icon on the \
            upper right adds +1 to your research points. )",
          "( The goal of the game is to gain as much research points as \
            possible to research new technologies and build new buildings. )",
          "( Hover mouse over the icons on the upper right to find more info. )",
          "( Amelia's help adds 0.017 to your research rate continuously. )",
          "( BE SURE TO THANK AMELIA! )",
          "Amelia: Hey Bro, I see that you researched 'Social Psych'.",
          "Amelia: When you research a tech that belongs to TRACK: HOAX.",
          "Amelia: You will progress the game in the path to debunk John Titor's story as a HOAX.",
          "Amelia: You will have to make a choice how the game ends.",
          "Amelia: Research tech on the TRACK: TIME TRAVEL will bring you closer to build a time machine.",
          "Amelia: Make sure you mouseover the research ICONs to find out which TRACK the tech belongs to."
          ],
  src: "./images/faces.png",
  imgPos: [508, 0, 100, 123, 0]
};

/***************** GAME ENDINGS DIALOGS *****************/

var endingTimeTravel = {
  dialogCounter: 0,
  script: [
          "You: Finally, the time machine is built",
          "You: It took tremendous effort for the whole team.",
          "You: Oh, well, let's start the time machine.",
          "Computer: Starting initiate sequence...please type in password",
          "You: g..i..t..c..h..e..c..k..o..u..t..m..a..s..t..e..r.. and ENTER!!"
          ]
};


/***************** IMAGE ASSETS LOADING *****************/
var currentBG = computer;  //begins the game with computer background
var currentChar = john; //begins the game with char john


//set background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = currentBG.src;

// set char image
var charReady = false;
var charImage = new Image();
charImage.onload = function () {
  charReady = false;
};
charImage.src = "././images/faces.png";
