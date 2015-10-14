/*************** SCRIPTING ************/
function script() {

    // Intro to game background and mechanics with John Titor
    $( "#dialogBox" ).on( "click", function() {

      if (gameCounter < 8) {
        $(".overlay").hide();
        charReady=true;
        $("#dialogBox" ).text(john.script[john.dialogCounter]);
          john.dialogCounter++; 
          console.log(gameCounter);  //remove before final 
        }// end of if gameCounter < 8

      if (gameCounter === 8) { 
        //hide dialog box and char sprite at game counter 8
        $("#dialogBox").append("<a href='#' class='button'>OK</a>");
         
        // event listener for button clicked
        $('.button').on('click', function() {
          $('.button').hide(); 
          charReady = false;
          $("#dialogBox").hide();
        });  // end of button click event
      } // enf of game counter at 8

          // when player's research pt increased to 10
      if (gameCounter ==9 || gameCounter==10 || gameCounter==11) { 
        $("#dialogBox").show();
        currentChar = you;
        charReady = true;
        $("#dialogBox").text(you.script[you.dialogCounter]);
          you.dialogCounter++; 
          console.log(gameCounter);
        };  // end if event 9, 10, 11

      if (gameCounter==12) { 
        $("#dialogBox").hide();
        charReady = false;
      };  // end if event 9, 10, 11


      gameCounter++;
    }); // end of click event on dialogbox


    // Click on computer 
    $( "#computer" ).on( "click", function() {
        $("#computer").attr("title", "Name: " + computer.name + "\n" 
          + "Cost: " + computer.cost + "\n" 
          + "Research Rate: " + computer.researchRate + "\n" 
          + "Owned: " + computer.owned);

          $("#dialogBox").show().text("You did research on " + computer.name);

        currentRate= computer.researchRate;
        researchPt++;
    });



    // consider moving research pt and title update to main.js
    // increase research point by current rate
    var secs = 100 * 60;
    setInterval(function() {
        researchPt += currentRate;
        checkFacility(lab);
        checkFacility(cern);
        checkResearch();
    }, secs);

    // update html title to notify research PT
    var secs = 50 * 60;
    setInterval(function() {
        $("title").text( parseFloat(researchPt).toFixed(2) + " Research Points Accumulated");
    }, secs);


} //end of script

//check if new research building is available
function checkFacility(facility) {

  if (researchPt > lab.cost) {
      if (!lab.append) {
        $(".row").append("<td><input type='image' id='lab' src='images/lab.png' style='display: none;'></td>");
          lab.append=true;
        $("#dialogBox").show().text("New Facility Avilable!"); 

        // listening for facility purchases
        $( "#lab" ).on( "click", function() {
            if (researchPt > lab.cost) lab.owned++; console.log("lab.owned"+ lab.owned);
            researchPt -= lab.cost;
            currentRate += lab.researchRate;
            currentBG = lab;
            bgImage.src = currentBG.src;

            if (lab.owned === 1) { $("#dialogBox").show().text("Moving to NEW FACILITY...  Congratulation! You purchased a NEW " + lab.name +" Research Rate +"+ lab.researchRate ) } 
            else { $("#dialogBox").show().text("Congratulation! You upgraded " + lab.name +" Research Rate +"+ lab.researchRate ); }

            $("#lab").attr("title", "Name: " + lab.name + "\n" 
              + "Cost: " + lab.cost + "\n" 
              + "Research Rate: " + lab.researchRate + "\n" 
              + "Owned: " + lab.owned);
              $("#lab").hide();
        });  // end of click event on lab
      } // end of if lab.append

        $( "#dialogBox" ).on( "click", function() {
            $("#dialogBox").hide();
        });  
        $("#lab").show();   

  } // end of researchPt > lab.cost
}  // end of function checkFacility

function checkResearch() {
        if (researchPt > tech1.cost) {
            if (tech1.isknown==[]) {
              $(".row").append("<td><input type='image' id='tech1' src='images/tech000.png' style='display: none;'></td>");
              $("#dialogBox").show().text("New Research Avilable!");          
            }

        } //end if research lab

}

script();