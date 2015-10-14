/*************** SCRIPTING ************/
function script() {

    // Intro to game background and mechanics with John Titor
    $("#dialogBox" ).on( "click", function() {

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

          // when dialog counter increased to 10
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
        $(".row").append("<td><input type='image' id="+facility.name+" src="+ facility.icon+" style='display: none;' height='50' width='50'></td>");
          facility.append=true;

        $("#" + facility.name).attr("title", "Name: " + facility.name + "\n" 
          + "Cost: " + facility.cost + "\n" 
          + "Research Rate: " + facility.researchRate * facility.owned + "\n" 
          + "Owned: " + facility.owned);

        $("#dialogBox").show().text("New Facility Avilable!"); 

        // listening for facility purchases
        $( "#" + facility.name ).on( "click", function() {
            if (researchPt > facility.cost) facility.owned++; 
            researchPt -= facility.cost;
            currentRate = facility.researchRate;
            currentBG = facility;
            bgImage.src = currentBG.src;

            // check if purchasing facility for the first time
            if (facility.owned === 1) { $("#dialogBox").show().text("Moving to NEW FACILITY...  Congratulation! You purchased a NEW " 
              + facility.name +"\n Research Rate +"+ facility.researchRate ) } 

            else { $("#dialogBox").show().text("Congratulation! You upgraded " + facility.name +" (Research Rate +"+ facility.researchRate + ")" ); }

              $("#"+facility.name).hide();
        });  // end of click event on lab
      } // end of if lab.append

        $( "#dialogBox" ).on( "click", function() {
            $("#dialogBox").hide();
        });  
        $("#"+facility.name).show();   

  } // end if researchPt > lab.cost
}  // end function checkFacility

function checkResearch(tech) {
  if (researchPt > tech.cost) {
      // if new research has not been append to row2 then do so, and then annouce new research to dialog box
      if (!tech.append) {
        $(".row2").append("<td><input type='image' id=" + tech.id + " src=" + tech.icon + " style='display: none;' height='50' width='50'></td>");
        $("#dialogBox").show().text("Possible research subject avilable on '" + tech.name + "'");  
        tech.append = true; 

        // TESTING MOUSEOVER
        $("#" + tech.id).attr("title", "Name: " + tech.name + "\n" 
          + "Cost: " + tech.cost + "\n" 
          + "Benefit: research Rate +" + tech.researchRate);

        // listening for research click to purchase
        $( "#" + tech.id ).on( "click", function() {
            if (researchPt > tech.cost) tech.isResearched = true; 
            researchPt -= tech.cost;
            currentRate += tech.researchRate;
            tech.isResearched = true;  

            // display tech infomation on overlay
            $(".overlay").html("<img src="+tech.icon+" width=50% height=50%><h3>"
              +tech.name+"</h3><p><i>Research rate: +" + tech.researchRate + "</i><br><br>"
              +tech.description+"</p>").css("fontSize", (newWidth / 2200) + 'em')
              .show();

            if (tech.isResearched == true) {
              $("#"+tech.id).remove();
              $("#dialogBox").show().text("New information has been acquired on '" + tech.name + "'");
            } //  end if (tech.isResearched == true)

        });  // end of click event on lab

      } // end if (!tech.append)
        
    // click dialogbox or overlay to hide
    $( "#dialogBox" ).on( "click", function() {
        $("#dialogBox").hide();
    });
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
          + "Total Research Rate: " + parseFloat(currentRate).toFixed(2) );
    });

    $( "#computer" ).on( "click", function() {
          $("#dialogBox").show().text("You did some googling on your own " + computer.name);
        currentRate= computer.researchRate;
        researchPt++;
    });
}

// increase research point by current rate
function updateFacility() {
    var secs = 3000; //3 sec 
    setInterval(function() {
        checkFacility(lab);
        checkFacility(cern);
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


script();