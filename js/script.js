/*************** SCRIPTING ************/
function script() {

    // Intro to game background and mechanics with John Titor
    $( "#dialogBox" ).on( "click", function() {

      if (gameCounter < 8) {
        $(".overlay").hide();
        charReady=true;
        $("#dialogBox" ).text(john.script[john.dialogCounter]);
          john.dialogCounter++; 
          // gameCounter++;
          console.log(gameCounter);
        }// end of if gameCounter < 8

      if (gameCounter === 8) { 
        //hide dialog box and char sprite at game counter 8
        $("#dialogBox").append("<a href='#' class='button'>OK</a>");
         
        // event listener for button clicked
        $('.button').on('click', function() {
          $('.button').hide(); 
          charReady = false;
          $("#dialogBox").hide();
          // gameCounter++;
        });  // end of button click event
      } // enf of game counter at 8

          // when player's research pt increased to 10
      if (gameCounter ==9 || gameCounter==10 || gameCounter==11) { 
        $("#dialogBox").show();
        currentChar = you;
        charReady = true;
        $("#dialogBox").text(you.script[you.dialogCounter]);
          you.dialogCounter++; 
          // gameCounter++;
          console.log(gameCounter);
        };  // end if event 9, 10, 11

      if (gameCounter==12) { 
        $("#dialogBox").hide();
        charReady = false;
        // gameCounter++;
      };  // end if event 9, 10, 11


      gameCounter++;
    }); // end of click event on dialogbox



    // diable computer until then - WIP

    // Click on computer 
    $( "#computer" ).on( "click", function() {
        $("#computer").attr("title", "Name: " + computer.name + "\n" 
          + "Cost: " + computer.cost + "\n" 
          + "Research Rate: " + computer.researchRate + "\n" 
          + "Owned: " + computer.owned);
        // currentRate= computer.researchRate;
        researchPt++;
    });

    // Click on lab
        $( "#lab" ).on( "click", function() {
          lab.owned++;
        $("#lab").attr("title", "Name: " + lab.name + "\n" 
          + "Cost: " + lab.cost + "\n" 
          + "Research Rate: " + lab.researchRate + "\n" 
          + "Owned: " + lab.owned);
        $("#dialogBox").hide();
        currentRate= lab.researchRate;
    }); //end of lab



    // consider moving research pt and title update to main.js
    // increase research point by current rate
    var secs = 100 * 60;
    setInterval(function() {
        researchPt += currentRate;
        facilityAvailable();
        researchAvailable();
    }, secs);

    // update html title to notify research PT
    var secs = 50 * 60;
    setInterval(function() {
        $("title").text( parseFloat(researchPt).toFixed(2) + " Research Points Accumulated");
    }, secs);


} //end of script

//check if new research building is available
function facilityAvailable() {
        if (researchPt > lab.cost) {
            if (!lab.append) {
              $(".row").append("<td><input type='image' id='lab' src='images/lab.png' style='display: none;'></td>");
                lab.append=true;
              $("#dialogBox").show().text("New Facility Avilable!"); 
                $( "#dialogBox" ).on( "click", function() {
                    $("#dialogBox").hide();
                });  
            } // end of researchPt > lab.cost

            $( "#lab" ).on( "click", function() {
                researchPt -= lab.cost;
                currentRate = lab.researchRate;
                currentBG = lab;
                bgImage.src = currentBG.src;
                $("#dialogBox").show().text("Congratulation! You purchased " + lab.name +" Research Rate +"+ lab.researchRate );
                $("#lab").hide();

            });  

            $( "#dialogBox" ).on( "click", function() {
                $("#dialogBox").hide();
            });  

            $("#lab").show();   
        } //end if research lab
}

function researchAvailable() {
        if (researchPt > tech1.cost) {
            if (tech1.isknown==[]) {
              $(".row").append("<td><input type='image' id='tech1' src='images/tech000.png' style='display: none;'></td>");
              $("#dialogBox").show().text("New Research Avilable!");          
            }
            $("#lab").show();   
        } //end if research lab

}

script();