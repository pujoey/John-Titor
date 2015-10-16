/***************

 script.js contains game story scripts, renders icons, 
 new background, technology data, characters

****************/





/***
polymorphic function subscript execute events DIFFERENTLY
based on number of arguments taken in arguments.length

2 arguments (currentGameCounter, futureGameCounter)
  means resetting dialog box and remove character
4 arguments (currentGameCounter, futureGameCounter, 
          character, script starting pos, script ending pos )
****/
function initScript() {


  // reset dialogbox and remove char from canvas
  if (arguments.length === 2) {
    if (gameCounter == arguments[0]) { 
      $("#dialogBox").text("");
      charReady = false;
      gameCounter = arguments[1]; 
    };  
  } //end if (arguments == 2)

  // set char and show dialog run char.script start pos to end pos
  if (arguments.length === 4) {
      if (gameCounter === arguments[0]) {
        currentChar = arguments[2];
        charReady = true;
        $("#dialogBox").show().text(arguments[2].script[arguments[2].dialogCounter]);
          if (arguments[2].dialogCounter==arguments[3]) {
            gameCounter=arguments[1];
            arguments[2].dialogCounter--; 
          }
          arguments[2].dialogCounter++; 
      }; // end of if (gameCounter === 14)
  } //end if (arguments == 4)


}

/*************** SCRIPTING - GAME STORY ************/

function script() {

    // Intro to game background and mechanics with John Titor
    $("#dialogBox" ).on( "click", function() {
        //hides game title overlay
        $(".overlay").hide();

      // starts the game intro with john
      initScript(0, 9, john, 8);  

      // display you.script
      initScript(9, 13, you, 3);  
      initScript(13, 15);

      // display amelia.script
      initScript(15, 18, amelia, 11);
      initScript(18, 19);

      // init dialog with john after researching first tech
      initScript(20, 24, john, 11);
      // initScript(23, 24);

      // respond to john
      initScript(24, 26, you, 5);
      // initScript(26, 27);

      // init dialog with john
      initScript(26, 28, john, 15);
      initScript(28, 29);

      // init dialog with amelia on possible hoax
      initScript(35, 36, amelia, 17);
      initScript(36, 37);

      // ending for track "Time Travel"
      initEnding();

    }); // end of click event on dialogbox


/***************** UPDATING ICONS/RESEARCH/MOUSEOVER NUMBERS ************/

    /* update on computer icon to append new info on 
    mouseover and listening to click to update research point */
    updateComputer(); 

    // check facility available bsed on available research points
    updateFacility();

    // check research available bsed on available research points
    updateResearch();

    // increase research point by current rate
    updateResearchPt();

    // update html title to notify research PT
    updateTitle();

} //end of script

//check if new research building is available
function checkFacility(facility) {

  if (researchPt > facility.cost) {

      // if new facility has not been append to row then do so, and then annouce new facility to dialog box
      if (!facility.append) {
        $(".row").append("<td><input type='image' id="+facility.name+" src="+ facility.icon+" style='display: none;' height='70' width='70'></td>");
          facility.append=true;

        append();  

        $("#dialogBox").show().text("New Facility Avilable!"); 

        // listening for facility purchases
        $( "#" + facility.name ).on( "click", function() {
            if (researchPt > facility.cost) facility.owned++; 
            researchPt -= facility.cost;
            currentRate += facility.researchRate;
            currentBG = facility;
            bgImage.src = currentBG.src;
 

            // check if purchasing facility for the first time
            if (facility.owned === 1) { $("#dialogBox").show().text("Moving to NEW FACILITY...  Congratulation! You purchased a NEW " 
              + facility.name +" (Research Rate +"+ facility.researchRate +").") } 
            else { $("#dialogBox").show().text("Congratulation! You upgraded " + facility.name +" (Research Rate +"+ facility.researchRate + ")" ); }

              $("#"+facility.name).hide();
        });  // end of click event on lab
      } // end of if !facility.append

      $("#"+facility.name).show();   


      function append() {
        $("#" + facility.name).attr("title", "Name: " + facility.name + "\n" 
          + "Cost: " + facility.cost + "\n" 
          + "Research Rate: +" + facility.researchRate + "\n" 
          + "Owned: " + facility.owned);
      } // end of function append 

      append();

      if (facility.name == "timeMachine" && facility.owned ==1 ) {
         gameCounter = facility.eventCounter;
      }


  } // end if researchPt > lab.cost
}  // end function checkFacility

function checkResearch(tech) {
  if (researchPt > tech.cost) {
      // if new research has not been append to row2 then do so, and then annouce new research to dialog box
      if (!tech.append) {
        $(".row2").append("<td><input type='image' id=" + tech.id + " src=" + tech.icon + " style='display: none;' height='70' width='70'></td>");
        $("#dialogBox").show().text("Possible research subject avilable on '" + tech.name + "'");  
        tech.append = true; 

        // TESTING MOUSEOVER
        $("#" + tech.id).attr("title", "Name: " + tech.name + "\n" 
          + "Cost: " + tech.cost + "\n" 
          + "Research Rate: +" + tech.researchRate + "\n" 
          + "Track: " + tech.track);

        // listening for research click to purchase
        $( "#" + tech.id ).on( "click", function() {
            if (researchPt > tech.cost) tech.isResearched = true; 
            researchPt -= tech.cost;
            currentRate += tech.researchRate;
            tech.isResearched = true;  


            // display tech infomation on overlay
            $(".overlay").html("<img src="+tech.icon+" width=50% height=50%><h3>"
              +tech.name+"</h3><p><i>Research rate: +" + tech.researchRate + "</i><br><br>"
              +tech.description+"</p>").css("fontSize", (newWidth / 2000) + 'em')
              .show();

            if (tech.voice) { $(".overlay").append("<audio controls autoplay><source src="+ tech.voice+"></audio>"); }    
            

            if (tech.isResearched == true) {
              gameCounter = tech.eventCounter;
              $("#"+tech.id).closest("td").remove();
              $("#dialogBox").show().text("(You have acquired new technology '" + tech.name + "')");
            } //  end if (tech.isResearched == true)

        });  // end of click event on lab

      } // end if (!tech.append)
        
    $( ".overlay" ).on( "click", function() {
        $(".overlay").hide();
    });

    // shows tech when accmulated enough researh points  
    if (tech.isResearched == false) $("#"+tech.id).show();  

  } //end if researchPt > tech.cost
} // end function checkResearch

// check current status on computer
function updateComputer() {
    // Click on computer 
    $( "#computer" ).mouseover(function() {
        $("#computer").attr("title", "Name: " + computer.name + "\n" 
          + "Total Research Rate: " + parseFloat(currentRate).toFixed(3) );
    });

    $( "#computer" ).on( "click", function() {
        $("#dialogBox").show().text("(You did some googling on your own " + computer.name+")");
        if (computer.owned ===0 ) {
          currentRate = computer.researchRate;
          computer.owned = 1;
        }
        researchPt++;
    });
}

// increase research point by current rate
function updateFacility() {
    var secs = 3000; //3 sec 
    setInterval(function() {
        checkFacility(lab);
        checkFacility(cern);
        checkFacility(timeMachine);

    }, secs);
}   

// check research available bsed on available research points
function updateResearch() {
    var secs = 3000; //3 sec 
    setInterval(function() {

        checkResearch(tech1);
        checkResearch(tech2);
        checkResearch(tech3);
        checkResearch(tech4);
        checkResearch(tech5);
        checkResearch(tech6);
        checkResearch(tech7);        
    }, secs); 
}

// increase research point by current rate
function updateResearchPt() {   
    var secs = 100;
    setInterval(function() {
      researchPt += currentRate;
    }, secs);
} 

// update html title to notify research PT
function updateTitle() {   
    var secs = 3000;
    setInterval(function() {
        $("title").text( parseFloat(researchPt).toFixed(2) + " Research Points gained");
    }, secs);
} 

// ending for different tracks by gameCounter
function initEnding() {

  //initiate main ending time traveler track
  if (gameCounter === 999) {
    currentChar= you;
    charReady = true;
    $("#dialogBox")
    .show()
    .text(endingTimeTravel.script[endingTimeTravel.dialogCounter]);

    endingTimeTravel.dialogCounter++;

      // after endingTimeTravel.script finishes, render credit
      if (endingTimeTravel.script.length===endingTimeTravel.dialogCounter) 
      { 
        setTimeout(function() {
        $("#dialogBox").text("");
        charReady = false;  
        $(".overlay").html("<img src='./images/timetravelending.png'\
          width=90% height=50%><h3><br><br>Thanks for playing <br>\
          <br>John Title: The Time Traveler</h3><p><br>\
          <br>Game Created by: Joey Lin</p>")
          .css("fontSize", (newWidth / 2000) + 'em')
          .show();
          } , 3000)

      } 
  } //end if counter ===99
} //end initEnding


script();